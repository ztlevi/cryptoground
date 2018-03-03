'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requestType = exports.requestType = {
  realTime: 'price',
  batch: 'histo',
  // Not used now
  topExchange: '/top/exchanges',
  topVolumn: '/top/volumns'
};

var intervalType = exports.intervalType = {
  dayly: 'day',
  hourly: 'hour',
  minute: 'minute'
};

var cryptoType = exports.cryptoType = ['BTC', 'ETH', 'LTC', 'TRX', 'ETC'];

var currencyType = exports.currencyType = ['USD', 'EUR'];
//# sourceMappingURL=cryptoConfigs.js.map