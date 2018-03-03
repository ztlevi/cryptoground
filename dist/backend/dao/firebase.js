'use strict';

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Fetch the service account key JSON file contents
var serviceAccount = require('../res/service_account.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crypto-exchange-simulator.firebaseio.com/'
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

var INFO_TYPE = {
  name: 'name',
  email: 'email',
  imageURL: 'imageURL'
};

// set user's name, email, imageURL
// firebase update node's children data
// https://firebase.google.com/docs/database/web/read-and-write?authuser=0#updating_or_deleting_data
var setUserInfo = function setUserInfo(userId, type, info) {
  if (!INFO_TYPE.type) {
    console.log('No such type found!');
    return;
  }

  return new Promise(function (resolve, reject) {
    var infoEntry = db.ref('users/' + userId + '/profile').child(INFO_TYPE.type).push().key;

    var updates = {};
    updates['users/' + userId + '/profile/' + INFO_TYPE.type] = info;

    db.ref('users/' + userId + '/profile').update(updates).then(function () {
      // set returns non-null firebase.Promise containing void
      // https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0#set
      resolve(1);
    }).catch(function (e) {
      reject(e);
    });
  });
};

// get user's profile
var getUserInfo = function getUserInfo(userId, type) {
  if (!INFO_TYPE.type) {
    console.log('No such type found!');
    return;
  }

  return new Promise(function (resolve, reject) {
    db.ref('users/' + userId + '/profile').once('value').then(function (profile) {
      if (!profile) reject(new Error('No user profile found!'));
      resolve(profile);
    }).catch(function (e) {
      reject(e);
    });
  });
};

// handle trading request
// append a new trading to the existing trading history
var setTrading = function setTrading(userId, tradingId, tradingData) {
  console.log('Push new trading to firebase...');

  return new Promise(function (resolve, reject) {
    var tradingEntry = db.ref('users/' + userId + '/trading').child(INFO_TYPE.type).push().key;

    var updates = {};
    updates['users/' + userId + '/profile/' + INFO_TYPE.type] = info;

    db.ref('users/' + userId + '/profile').update(updates).then(function () {
      resolve(1);
    }).catch(function (e) {
      reject(e);
    });
  });
};

var fetchTrading = function fetchTrading(userId) {
  return new Promise(function (resolve, reject) {
    db.ref('users/' + userId + '/trading').once('value').then(function (data) {
      if (!data) reject(new Error('No trading history found!'));
      resolve(data);
    }).catch(function (e) {
      return reject(e);
    });
  });
};

var verifyIdToken = function verifyIdToken(idToken) {
  return new Promise(function (resolve, reject) {
    admin.auth().verifyIdToken(idToken).then(function (decodedToken) {
      var uid = decodedToken.uid;
      resolve(uid);
    }).catch(function (error) {
      reject(error);
    });
  });
};

module.exports = {
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  setTrading: setTrading,
  fetchTrading: fetchTrading,
  verifyIdToken: verifyIdToken
};
//# sourceMappingURL=firebase.js.map