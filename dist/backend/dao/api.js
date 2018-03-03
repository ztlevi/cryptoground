'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCurrencyPrice = exports.cachedCryptoPrice = undefined;

var _axios = require('axios');

var axios = _interopRequireWildcard(_axios);

var _cryptoConfigs = require('../res/cryptoConfigs');

var _cryptoDataUrls = require('../utils/cryptoDataUrls');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var cachedCryptoPrice = exports.cachedCryptoPrice = null;

var updateCurrencyPrice = exports.updateCurrencyPrice = function updateCurrencyPrice() {
  var fromSyms = ['USD'];

  return new Promise(function (resolve, reject) {
    axios.get((0, _cryptoDataUrls.cryptoRealtimeRequestUrl)(fromSyms, _cryptoConfigs.cryptoType)).then(function (response) {
      if (response.status === 200) {
        console.log('Fetch cryptocurrency price succeed!!!');
        exports.cachedCryptoPrice = cachedCryptoPrice = response.data;
        resolve(1);
      } else {
        console.log('Fetch cryptocurrency price failed!!!');
        resolve(0);
      }
    }).catch(function (e) {
      return reject(e);
    });
  });
};
//# sourceMappingURL=api.js.map