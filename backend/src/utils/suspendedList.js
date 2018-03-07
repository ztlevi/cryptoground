import { verifyTradingRequest } from './trading_verification';
var firebase = require('../dao/firebase');
import { cachedCryptoPrice } from '../dao/api';
import { fetchSuspendedList, setSuspendedList } from '../dao/redis';

export var suspendedList = {}; // uid => key => data

export const firstUpdateSuspendedList = () => {
  console.log('First fetch suspendedList!!!');

  fetchSuspendedList()
    .then(data => {
      if (!data) {
        console.log('SuspendedList is empty!');
        return;
      }
      suspendedList = data;
      console.log(suspendedList);
    })
    .catch(e => {
      // firebase.uploadSuspendedList(suspendedList).then(re => {
      //   if (!re) return;
      //   console.log('Upload an empty suspended list');
      // });
      return;
    });
};

export const addToSuspendedList = (uid, key, trading_request) => {
  if (!suspendedList[uid]) suspendedList[uid] = [];
  // suspendedList[uid][key].push(trading_request);
  suspendedList[uid].push({ key: key, data: trading_request });
};

// resolve request remains in the suspendedList every miniute
export const resolveSuspendedList = list => {
  let newSuspendedList = {};
  for (let uid in list) {
    for (let i = 0; i < list[uid].length; i++) {
      if (list[uid][i]) {
        let item = list[uid][i];
        let request = item.data;
        let key = item.key;

        let currentTime = new Date().getTime() / 1000;
        if (request.timestamp + request.expiration > currentTime) {
          if (!newSuspendedList[uid]) newSuspendedList[uid] = [];
          newSuspendedList[uid].push(item);
        }
      }
    }
  }

  suspendedList = newSuspendedList;

  if (suspendedList) {
    setSuspendedList(suspendedList);
  } else {
    console.log('No suspendedList!!!! Reference error!!!');
  }

  // process trading request
  for (let uid in suspendedList) {
    let newList = [];
    for (let i = 0; i < suspendedList[uid].length; i++) {
      let item = suspendedList[uid][i];
      let req = item.data;
      let key = item.key;
      firebase.fetchUserBalance(uid).then(response => {
        if (!response) {
          console.log('Fetching user balance failed!!!');
          return;
        }

        let verifyResult = verifyTradingRequest(
          req,
          response,
          cachedCryptoPrice
        );
        if (verifyResult.status === 'complete') {
          // update Firebase's balance
          req.status = 'complete';
          Promise.all([
            firebase.updateUserTradingStatus(uid, key, 'complete'),
            firebase.updateUserBalance(uid, verifyResult.balance),
          ])
            .then(response => {
              if (!response)
                console.log(
                  "Cannot update user's new balance or push to the new trading record, request failed!"
                );
              console.log('Trading request has been approved!');
            })
            .catch(e => {
              console.log(e);
            });
        } else if (verifyResult.status === 'failed') {
          console.log(req);
          req.status = 'failed';
          firebase
            .updateUserTradingStatus(uid, key, 'failed')
            .then(() => {
              console.log('Trading request is failed!');
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          newList.push(item);
        }
      });
    }
    suspendedList[uid] = newList;
  }
};
