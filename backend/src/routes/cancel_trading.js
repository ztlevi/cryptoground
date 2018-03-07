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
      firebase
        .updateUserTradingStatus(uid, cancelKey, 'cancelled')
        .then(response => {
          res.jsonp({
            // Return ture for previous suspended items
            status: 'cancelled',
            message: 'Cancel the suspended trading request successfully!',
          });
        });
      return;
    }
    let i = 0;
    while (i < suspendedList[uid].length) {
      let key = suspendedList[uid][i].key;
      if (key && key === cancelKey) {
        firebase
          .updateUserTradingStatus(uid, key, 'cancelled')
          .then(response => {
            if (!response)
              res.jsonp({
                status: 'failed',
                message: 'Cannot updateUserTradingStatus to cancel!!!',
              });

            suspendedList[uid] = suspendedList[uid]
              .slice(0, i)
              .concat(suspendedList[uid].slice(i + 1));

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
  });
});

module.exports = router;
