var express = require('express');
var router = express.Router();

var firebase = require('../dao/firebase');
var md5 = require('md5');
const EXPIRATION = 259200;
import { cachedCryptoPrice } from '../dao/api';
import { verifyTradingRequest } from '../utils/trading_verification';
import { addToSuspendedList } from '../utils/suspendedList';

router.post('/', function(req, res, next) {
  firebase.verifyIdToken(req.body.idToken).then(uid => {
    if (!uid) {
      res.send('User verify failed!!!');
      return;
    }

    req = req.body;
    // req.uid = uid;
    req.timestamp = new Date().getTime() / 1000;
    req.expiration = EXPIRATION;

    let md5Str = md5(req.timestamp + uid);
    let tradingId = md5Str.substring(0, 6);
    let tradingObject = req;
    // let tradingObject = {
    //   tradingId: req,
    // };

    firebase.fetchUserBalance(uid).then(response => {
      if (!response) {
        res.send('Fetching user balance failed!!!');
        return;
      }
      let verifyResult = verifyTradingRequest(req, response, cachedCryptoPrice);
      if (verifyResult.status === 'complete') {
        // update the request status and push it to the firebase
        req.status = 'complete';

        Promise.all([
          firebase.pushUserTradingList(uid, tradingObject),
          firebase.updateUserBalance(uid, verifyResult.balance),
        ]).then(response => {
          if (!response)
            res.send(
              "Cannot update user's new balance or push to the new trading record, request failed!"
            );
          res.jsonp({
            status: 'complete',
            message: 'Trading request has been approved!',
          });
        });
      } else if (verifyResult.status === 'suspend') {
        // push suspend status request to tradingList
        req.status = 'suspend';
        firebase
          .pushUserTradingList(uid, tradingObject)
          .then(key => {
            addToSuspendedList(uid, key, tradingObject);

            res.jsonp({
              status: 'suspend',
              message: 'Trading request has been suspended!',
            });
          })
          .catch(e => {
            res.send('Suspend status: pushing to tradingList failed');
          });
      } else {
        // push failed status request to tradingList
        req.status = 'failed';
        firebase.pushUserTradingList(uid, tradingObject);

        res.jsonp({
          status: 'failed',
          message: 'Trading request is failed!',
        });
      }
    });
  });
});

module.exports = router;
