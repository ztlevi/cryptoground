import * as admin from 'firebase-admin';

// Fetch the service account key JSON file contents
let serviceAccount = require('../res/service_account.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crypto-exchange-simulator.firebaseio.com/',
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
let db = admin.database();

const INFO_TYPE = {
  name: 'name',
  email: 'email',
  imageURL: 'imageURL',
};

// set user's name, email, imageURL
// firebase update node's children data
// https://firebase.google.com/docs/database/web/read-and-write?authuser=0#updating_or_deleting_data
const setUserInfo = (userId, type, info) => {
  if (!INFO_TYPE.type) {
    console.log('No such type found!');
    return;
  }

  return new Promise((resolve, reject) => {
    let infoEntry = db
      .ref('users/' + userId + '/profile')
      .child(INFO_TYPE.type)
      .push().key;

    let updates = {};
    updates['users/' + userId + '/profile/' + INFO_TYPE.type] = info;

    db
      .ref('users/' + userId + '/profile')
      .update(updates)
      .then(() => {
        // set returns non-null firebase.Promise containing void
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0#set
        resolve(1);
      })
      .catch(e => {
        reject(e);
      });
  });
};

// get user's profile
const getUserInfo = (userId, type) => {
  if (!INFO_TYPE.type) {
    console.log('No such type found!');
    return;
  }

  return new Promise((resolve, reject) => {
    db
      .ref('users/' + userId + '/profile')
      .once('value')
      .then(profile => {
        if (!profile) reject(new Error(`No user profile found!`));
        resolve(profile);
      })
      .catch(e => {
        reject(e);
      });
  });
};

// handle trading request
// append a new trading to the existing trading history
const setTrading = (userId, tradingId, tradingData) => {
  console.log('Push new trading to firebase...');

  return new Promise((resolve, reject) => {
    let tradingEntry = db
      .ref('users/' + userId + '/trading')
      .child(INFO_TYPE.type)
      .push().key;

    let updates = {};
    updates['users/' + userId + '/profile/' + INFO_TYPE.type] = info;

    db
      .ref('users/' + userId + '/profile')
      .update(updates)
      .then(() => {
        resolve(1);
      })
      .catch(e => {
        reject(e);
      });
  });
};

const fetchTrading = userId => {
  return new Promise((resolve, reject) => {
    db
      .ref('users/' + userId + '/trading')
      .once('value')
      .then(data => {
        if (!data) reject(new Error('No trading history found!'));
        resolve(data);
      })
      .catch(e => reject(e));
  });
};

const verifyIdToken = idToken => {
  return new Promise((resolve, reject) => {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        var uid = decodedToken.uid;
        resolve(uid);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  setUserInfo,
  getUserInfo,
  setTrading,
  fetchTrading,
  verifyIdToken,
};
