const TRADING_TYPE = { BUY: 'BUY', SELL: 'SELL' };

export const verifyTradingRequest = (
  trading_request,
  userBalance,
  cachedCryptoPrice
) => {
  let from = trading_request.tradingFromSym;
  let to = trading_request.tradingToSym;
  let price = trading_request.tradingPrice;
  let amount = trading_request.tradingAmount;
  let action = trading_request.tradingType;
  let re = {};

  let marketPrice = 0;
  let newBalance = userBalance;
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
};
