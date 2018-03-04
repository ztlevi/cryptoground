import * as cryptoConfigs from '../res/cryptoConfigs';
import { queryRateTable, cachedCryptoPrice } from '../dao/api';
import { listAllUsers, fetchUserBalance } from '../dao/firebase';
import thenjs from 'thenjs';
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

export const genLeaderBoard = () => {
  return new Promise((resolve, reject) => {
    let list = [];
    listAllUsers(list).then(uidEmailList => {
      thenjs
        .each(uidEmailList, (defer, obj) => {
          fetchUserBalance(obj.uid)
            .then(res => {
              defer(null, res);
            })
            .catch(err => defer(err, res));
        })
        .then((defer, result) => {
          // console.log('balance', result);
          computeTotals(result).then(userAssets => {
            let structuredData = userAssets.map((item, i) => {
              return {
                uid: uidEmailList[i].uid,
                email: uidEmailList[i].email,
                assets: item,
              };
            });
            // console.log('final assets list', structuredData)
            resolve(structuredData);
          });
        })
        .fail((defer, err) => {
          reject(err);
        });
    });
  });
};
