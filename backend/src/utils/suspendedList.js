// import {processTradingRequest} from '../'
export let suspendedList = new Set();

export const addToSuspendedList = trading_request => {
  suspendedList.add(trading_request);
};

// mock some fake data here for testing
let t1 = {
  uid: 1,
  tradingId: 1,
  tradingType: 'BUY',
  tradingPrice: 10000,
  tradingFromSym: 'USD',
  tradingToSym: 'BTC',
  tradingAmount: 10000,
  timetamp: 1520066590.607,
  expiration: 3000,
};

let t2 = {
  uid: 2,
  tradingId: 1,
  tradingType: 'SELL',
  tradingPrice: 10000,
  tradingFromSym: 'BTC',
  tradingToSym: 'USD',
  tradingAmount: 0.1,
  timetamp: 1520066590.607,
  expiration: 3000,
};

addToSuspendedList(t1);
addToSuspendedList(t2);

// resolve request remains in the suspendedList every miniute
export const resolveSuspendedList = () => {
  if (!suspendedList) return;

  // remove expired request
  let newSuspendedList = new Set();
  suspendedList.forEach((request, i) => {
    let currentTime = new Date().getTime() / 1000;
    if (request.timestamp + expiration < currentTime) {
      newSuspendedList.add(request);
    }
  });
  suspendedList = newSuspendedList;

  // process trading request
  suspendedList.forEach((request, i) => {
    console.log(request.uid);

    // processTradingRequest(request);
  });
};
