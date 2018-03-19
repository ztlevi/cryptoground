import axios from 'axios';

import * as ApiUrl from '../res/cryptoDataUrls';
import * as cryptoConfigs from '../res/cryptoConfigs';
import * as firebaseUrls from '../res/firebaseUrls';

export const fetchUserBalance = (uid, idToken) => {
  let endpoint = firebaseUrls.fetchFirebaseDbUrl(
    ['users', uid, 'balance'],
    idToken
  );
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint)
      .then(res => {
        if (res && res.data) {
          resolve(res.data);
        } else {
          reject(0);
        }
      })
      .catch(err => reject(err));
  });
};

export const initUserBalance = (uid, idToken) => {
  let endpoint = firebaseUrls.fetchFirebaseDbUrl(
    ['users', uid, 'balance'],
    idToken
  );
  let initialBalance = {};
  const { cryptoType, currencyType } = cryptoConfigs;
  for (let idx in cryptoType) {
    initialBalance[cryptoType[idx]] = 0;
  }
  for (let idx in currencyType) {
    initialBalance[currencyType[idx]] = 0;
  }
  initialBalance['USD'] = 10000;
  return new Promise((resolve, reject) => {
    axios
      .put(endpoint, initialBalance)
      .then(() => resolve(1))
      .catch(err => reject(err));
  });
};

export const fetchUserTradingList = (uid, idToken) => {
  let url = firebaseUrls.fetchFirebaseDbUrl(['users', uid, 'trading'], idToken);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res && res.data) {
          //console.log('tradingList', res.data);
          resolve(res.data);
        } else {
          reject(0);
        }
      })
      .catch(err => reject(err));
  });
};

export const fetchLeaderBoardFromFirebase = idToken => {
  let url = firebaseUrls.fetchFirebaseDbUrl(['leaderboard'], idToken);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res && res.data) {
          resolve(res.data);
        } else {
          reject(0);
        }
      })
      .catch(err => reject(err));
  });
};

export const fetchLeaderBoardFromBackend = () => {
  let url = ApiUrl.herokuLeaderBoardUrl;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res) {
          resolve(res);
        } else {
          reject(0);
        }
      })
      .catch(err => reject(err));
  });
};

export const findRank = (email, leaderBoard) => {
  for (let i in leaderBoard) {
    const obj = leaderBoard[i];
    if (email === obj['email']) {
      return i;
    }
  }
  return -1;
};
