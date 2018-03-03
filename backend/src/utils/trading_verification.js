const TRADING_TYPE = { BUY: 'BUY', SELL: 'SELL' };

// import { cachedCryptoPrice } from '../dao/api';

// console.log(cachedCryptoPrice);

export function verifyTradingRequest(
  trading_request,
  userBalance,
  cachedCryptoPrice,
) {
  var from = trading_request.tradingFromSym;
  var to = trading_request.tradingToSym;
  var price = trading_request.tradingPrice;
  var amount = trading_request.tradingAmount;
  var action = trading_request.tradingType;
  var re = {};

  var marketPrice = 0;
  var newBalance = userBalance;
  if (action === TRADING_TYPE.SELL) {
    marketPrice = cachedCryptoPrice[from];
    if (marketPrice[to] <= price) {
      // should suspend
      re['status'] = 'suspend';
    } else {
      // success
      newBalance[from] -= amount;
      newBalance[to] += amount * price;
      if (newBalance[from] < 0) {
        re['status'] = 'failed';
      } else {
        re['status'] = 'complete';
        re['balance'] = newBalance;
      }
    }
  } else if (action === TRADING_TYPE.BUY) {
    marketPrice = cachedCryptoPrice[to];
    if (marketPrice[from] >= price) {
      // suspend
      re['status'] = 'suspend';
    } else {
      // success
      newBalance[from] -= amount * price;
      newBalance[to] += amount;
      if (newBalance[from] < 0) {
        re['status'] = 'failed';
      } else {
        re['status'] = 'complete';
        re['balance'] = newBalance;
      }
    }
  } else {
    re['status'] = 'failed';
  }
  return re;
}
