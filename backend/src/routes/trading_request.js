const BUY = 1;
const SELL = 0;
const SUSPEND_EXPIRE = 24;

var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();

var firebase = require('../dao/firebase.js');

// router.use(bodyParser.json());
router.post('/', function(req, res, next) {
  firebase.verifyIdToken(req.body.idToken).then(uid => {
    if (!uid) {
      res.send(0);
      return;
    }

    // cachedCryptoPrice in api.js
    // verifyTradingRequest(
    //   fromCrypto,
    //   toCrypto,
    //   fromCryptoAmount,
    //   toCryptoAmount,
    // ).then(response => {
    //   // approve => send back json result to user
    //   // suspend => addToSuspendList
    // });
  });
  // console.log('Transaction requested');
  // var re = {};
  // var userTokenId = req.body.idToken;
  // varify user token id
  // if (firebase.verifyIdToken(userTokenId) == 0) {
  // 	re['status'] = 400;
  // 	re['message'] = 'Invalid user token id';
  // 	res.jsonp(re);
  // }
  // else {
  //   var uid = firbase.getUserId();
  //   var tradingId = firebase.getTradingId();
  // }
  // // 0 for sell, 1 for buy
  // var action = req.body.tradingType;
  // var tradingFromSym = req.body.tradingFromSym;
  // var tradingToSym = req.body.tradingToSym;
  // var price = req.body.tradingPrice;
  // var amount = req.body.tradingAmount;
  // var timestamp = Date.now();
  // var expiration = req.body.expiration;
  // var pendingTrading = {
  //   'uid': uid,
  //   'tradingId': tradingId,
  //   'tradingType': action,
  //   'tradingFromSym': tradingFromSym,
  //   'tradingToSym': tradingToSym,
  //   'tradingPrice': price,
  //   'tradingAmount': amount,
  //   'timestamp': timestamp,
  //   'expiration': exiration
  // }
  // // get marketPrice from firebase
  // var marketPrice = 0;
  // if (action == SELL) {
  //   marketPrice = firebase.getMarcketPrice(tradingFromSym);
  //   if (marketPrice <= price) {
  //     // suspend
  //     // adding to pending list
  //     if (firebase.pushToSuspendList(pendingTrading)) {
  //       re['status'] = 210;
  //       re['message'] = 'Tansaction is pending';
  //     }
  //     else {
  //       re['status'] = 500;
  //       re['message'] = 'Failed';
  //     }
  //   }
  //   else {
  //     // success
  //     // firebase operation
  //     if (firebase.setTrading(uid, tradingId, {
  //       'tradingType': action,
  //       'tradingFromSym': tradingFromSym,
  //       'tradingToSym': tradingToSym,
  //       'tradingPrice': price,
  //       'tradingAmount': amount
  //     })) {
  //       var userBalance = firebase.getUserInfo(uid, balance);
  //       userBalance[tradingFromSym] -= amount;
  //       userBalance[tradingToSym] += amount * price;
  //       if (firebase.updateUser(uid, balance)) {
  //         re['status'] = 200;
  //         re['message'] = 'Success';
  //       }
  //       else {
  //         firebase.removeTrading(uid, tradingId);
  //         re['status'] = 500;
  //         re['message'] = 'Failed';
  //       }
  //     }
  //     else {
  //       re['status'] = 500;
  //       re['message'] = 'Failed';
  //     }
  //   }
  // }
  // else if (action == BUY) {
  //   marketPrice = firebase.getMarcketPrice(tradingToSym);
  //   if (marketPrice >= price) {
  //     // suspend
  //     // adding to pending list
  //     if (firebase.pushToSuspendList(pendingTrading)) {
  //       re['status'] = 210;
  //       re['message'] = 'Tansaction is pending';
  //     }
  //     else {
  //       re['status'] = 500;
  //       re['message'] = 'Failed';
  //     }
  //   }
  //   else {
  //     // success
  //     // firebase operation
  //     if (firebase.setTrading(uid, tradingId, {
  //       'tradingType': action,
  //       'tradingFromSym': tradingFromSym,
  //       'tradingToSym': tradingToSym,
  //       'tradingPrice': price,
  //       'tradingAmount': amount
  //     })) {
  //       var userBalance = firebase.getUserInfo(uid, balance);
  //       userBalance[tradingFromSym] -= amount * price;
  //       userBalance[tradingToSym] += amount;
  //       if (firebase.updateUser(uid, balance, )) {
  //         re['status'] = 200;
  //         re['message'] = 'Success';
  //       }
  //       else {
  //         firebase.removeTrading(uid, tradingId);
  //         re['status'] = 500;
  //         re['message'] = 'Failed';
  //       }
  //     }
  //     else {
  //       re['status'q] = 500;
  //       re['message'] = 'Failed';
  //     }
  //   }
  // }
  // else {
  //   re['status'] = 500;
  //   re['message'] = 'Failed';
  // }
  // res.jsonp(re);
});

module.exports = router;
