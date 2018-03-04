import * as admin from 'firebase-admin';

// Fetch the service account key JSON file contents
let serviceAccount = require('../res/service_account.json');
import { suspendedList } from '../utils/suspendedList';

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crypto-exchange-simulator.firebaseio.com/',
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();

export const uploadSuspendedList = suspendedList => {
  return new Promise((resolve, reject) => {
    db
      .ref('suspendedList/')
      .set(suspendedList)
      .then(() => {
        resolve(1);
      })
      .catch(e => reject(e));
  });
};

export const fetchSuspendedList = () => {
  return new Promise((resolve, reject) => {
    db
      .ref('suspendedList/')
      .once('value')
      .then(response => {
        let result = response.val();
        resolve(result);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const updateUserTradingStatus = (uid, key, status) => {
  return new Promise((resolve, reject) => {
    console.log('updateUserTradingStatus!!!!!');
    console.log(uid, key, status);
    db
      .ref('users/' + uid + '/trading/' + key + '/status')
      .set(status)
      .then(() => {
        resolve(1);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const pushUserTradingList = (uid, newTradingData) => {
  return new Promise((resolve, reject) => {
    let key = db.ref('users/' + uid + '/trading').push().key;

    db
      .ref('users/' + uid + '/trading/' + key)
      .set(newTradingData)
      .then(() => {
        resolve(key);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const fetchUserTradingList = uid => {
  return new Promise((resolve, reject) => {
    db
      .ref('users/' + uid + '/trading')
      .once('value')
      .then(data => {
        if (!data) reject(new Error('No trading history found!'));
        resolve(data);
      })
      .catch(e => reject(e));
  });
};

export const fetchUserBalance = uid => {
  return new Promise((resolve, reject) => {
    db
      .ref('users/' + uid + '/balance')
      .once('value')
      .then(response => {
        if (!response) resolve(0);
        let userBalance = response.val();
        resolve(userBalance);
      })
      .catch(e => reject(e));
  });
};

export const updateUserBalance = (uid, newBalance) => {
  return new Promise((resolve, reject) => {
    db
      .ref('users/' + uid + '/balance')
      .set(newBalance)
      .then(() => {
        resolve(1);
      })
      .catch(e => reject(e));
  });
};

export const verifyIdToken = idToken => {
  return new Promise((resolve, reject) => {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        let uid = decodedToken.uid;
        resolve(uid);
      })
      .catch(error => {
        reject(error);
      });
  });
};
