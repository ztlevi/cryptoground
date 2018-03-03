const BUY = 1;
const SELL = 0;
const SUSPEND_EXPIRE = 24;

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var firebase = require('../dao/firebase.js');

router.use(bodyParser.json());
router.post('/', function (req, res, next) {
  console.log('Transaction requested');
  var re = {};

  var userTokenId = req.body.idToken;
  // varify user token id
  // if (firebase.verifyIdToken(userTokenId) == 0) {
  // 	re['status'] = 400;
  // 	re['message'] = 'Invalid user token id';
  // 	res.jsonp(re);
  // }

  // 0 for sell, 1 for buy
  var action = req.body.tradingType;
  var tradingFromSym = req.body.tradingFromSym;
  var tradingToSym = req.body.tradingToSym;
  var price = req.body.tradingPrice;
  var amount = req.body.tradingAmount;
  var timestamp = Date.now();

  // get marketPrice from firebase
  var marketPrice = 0;
  if (action == SELL && marketPrice <= price || action == BUY && marketPrice >= price) {
    // suspend
    // adding to pending list

    re['status'] = 210;
    re['message'] = 'Tansaction is pending';
  }
  else {
    // success
    // firebase operation
    re['status'] = 200;
    re['message'] = 'Success';
  }


  res.jsonp(re);
});

module.exports = router;
