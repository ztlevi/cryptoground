var express = require('express');
var router = express.Router();

var firebase = require('../dao/firebase');
import { cachedCryptoPrice } from '../dao/api';
import { verifyTradingRequest } from '../utils/trading_verification';

router.post('/', function(req, res, next) {
  firebase.verifyIdToken(req.body.idToken).then(uid => {
    if (!uid) {
      res.send('User verify failed!!!');
      return;
    }

    firebase.fetchUserBalance(uid).then(response => {
      if (!response) {
        res.send('Fetching user balance failed!!!');
        return;
      }
      let verifyResult = verifyTradingRequest(
        req.body,
        response,
        cachedCryptoPrice
      );
      if (verifyResult.status === 'complete') {
        firebase.updateUserBalance(uid, verifyResult.balance).then(response => {
          if (!response)
            res.send("Cannot update user's new balance, request failed!");
          res.jsonp({
            status: 'complete',
            message: 'Trading request has been approved!',
          });
        });
      } else if (verifyResult.status === 'suspend') {
        res.jsonp({
          status: 'suspend',
          message: 'Trading request has been suspended!',
        });
      } else {
        res.jsonp({
          status: 'failed',
          message: 'Trading request is failed!',
        });
      }
    });
  });
});

module.exports = router;
