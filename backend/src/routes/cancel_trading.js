var express = require('express');
var router = express.Router();

import { suspendedList } from '../utils/suspendedList';
import * as firebase from '../dao/firebase';

/* GET home page. */
router.post('/', function(req, res, next) {
  firebase.verifyIdToken(req.body.idToken).then(uid => {
    if (!uid) {
      res.jsonp({ status: 'failed', message: 'Failed at verifyIdToken!' });
      return;
    }

    let cancelKey = req.body.key;

    if (!suspendedList || !suspendedList[uid]) {
      res.jsonp({
        status: 'failed',
        message: 'Cannot cancel because suspendedList is empty!!!',
      });
      return;
    }
    let i = 0;
    while (i < suspendedList[uid].length) {
      let key = suspendedList[uid][i].key;
      if (key && key === cancelKey) {
        console.log(key);
        suspendedList.slice(i, 1);
        firebase
          .updateUserTradingStatus(uid, key, 'cancelled')
          .then(res => {
            if (!res)
              res.jsonp({
                status: 'failed',
                message: 'Cannot updateUserTradingStatus to cancel!!!',
              });

            res.jsonp({
              status: 'cancelled',
              message: 'Cancel the suspended trading request successfully!',
            });
          })
          .catch(e => {
            reject(e);
          });
        break;
      }
      i++;
    }
    res.jsonp({
      status: 'failed',
      message:
        'Cannot cancel because the suspended request is not in suspendedList',
    });
  });
});

module.exports = router;
