import * as cryptoConfigs from '../res/cryptoConfigs';
import { queryRateTable, cachedCryptoPrice } from '../dao/api';
export const initialUSD = 10000;

/**
 * Batch calculate total assets
 * @param balances: Array
 * @returns result: Array[{
 *  USD: <USD>
 *  BTC: <BTC>
 *  ROI: <ROI>
 * }]
 */
export const computeTotals = balances => {
  let rateTable = {};
  let result = [];
  return new Promise((resolve, reject) => {
    queryRateTable()
      .then(res => {
        rateTable = res;
        for (let i in balances) {
          let totalUSD = 0;
          let totalBTC = 0;
          for (let sym in balances[i]) {
            totalUSD += balances[i][sym] * rateTable[sym]['USD'];
            totalBTC += balances[i][sym] * rateTable[sym]['BTC'];
          }
          let ROI = totalUSD / initialUSD;
          result.push({
            USD: totalUSD,
            BTC: totalBTC,
            ROI: ROI,
          });
          resolve(result);
        }
      })
      .catch(err => reject(err));
  });
};
