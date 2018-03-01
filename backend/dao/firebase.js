import * as firebase from 'firebase';

import config from '../utils/firebaseConfigs';

firebase.initializeApp(config);

const INFO_TYPE = {
  name: 'name',
  email: 'email',
};

// set user's name or email
const setUserInfo = (userId, type, info) => {
  if (!INFO_TYPE.type) {
    console.log('No such type found!');
    return;
  }

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('users/' + userId + '/' + INFO_TYPE.type)
      .set(info);
    resolve(1);
  });
};

// get user's name or email
const getUserInfo = (userId, type) => {
  if (!INFO_TYPE.type) {
    console.log('No such type found!');
    return;
  }

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('users/' + userId + '/' + INFO_TYPE.type)
      .once('value')
      .then(info => {
        if (!info) reject(new Error(`No ${INFO_TYPE.type} found!`));
        resolve(info);
      })
      .catch(e => {
        reject(e);
      });
  });
};

// handle trading request
const setTrading = (userId, tradingId, tradingData) => {
  console.log('Push data to firebase...');

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('users/' + userId + '/trading/' + tradingId)
      .set(tradingData);

    // increment tradingCounter
    firebase
      .database()
      .ref('user/' + userId + '/tradingCounter')
      .once('value')
      .then(num => {
        if (!num) {
          firebase
            .database()
            .ref('user/' + userId + '/tradingCounter')
            .set(0);
        } else {
          firebase
            .database()
            .ref('user/' + userId + '/tradingCounter')
            .set(num + 1);
        }
      });

    // adddd new tradingId to tradingIdList
    var newTrading = firebase
      .database()
      .ref('user/' + userId + '/tradingIdList')
      .push();
    newTrading.set({ 3: 'this is a new Trading' });
    resolve(1);
  });
};

const fetchTrading = (userId, tradingId) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('users/' + userId + '/trading/' + tradingId)
      .once('value')
      .then(data => {
        if (!data) reject(new Error('No name found!'));
        resolve(data);
      })
      .catch(e => reject(e));
  });
};

module.exports = {
  setUserInfo,
  getUserInfo,
  setTrading,
  fetchTrading,
};
