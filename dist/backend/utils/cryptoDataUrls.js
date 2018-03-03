'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cryptoRootUrl = exports.cryptoRootUrl = 'https://min-api.cryptocompare.com/data';

/**
 * generate crypto request to fetch multiple symbols price
 * @param fromSyms: Array
 * @param toSyms: Array
 * @returns {string}
 */
var cryptoRealtimeRequestUrl = exports.cryptoRealtimeRequestUrl = function cryptoRealtimeRequestUrl(fromSyms, toSyms) {
  return cryptoRootUrl + '/pricemulti?fsyms=' + fromSyms.join() + '&tsyms=' + toSyms.join();
};

// generate crypto request to fetch multiple symbols price
var cryptoBatchRequestUrl = exports.cryptoBatchRequestUrl = function cryptoBatchRequestUrl(fromSym, toSym, intervalType, limit) {
  var aggregate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  return cryptoRootUrl + '/histo' + intervalType + '?fsym=' + fromSym + '&tsym=' + toSym + '&aggregate=' + aggregate + '&limit=' + limit;
};
//# sourceMappingURL=cryptoDataUrls.js.map