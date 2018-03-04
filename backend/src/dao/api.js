import * as axios from 'axios';

import { cryptoType, currencyType } from '../res/cryptoConfigs';
import { cryptoRealtimeRequestUrl } from '../utils/cryptoDataUrls';

export let cachedCryptoPrice = {};

export const queryRateTable = () => {
  let url = cryptoRealtimeRequestUrl(
    [...cryptoType, ...currencyType],
    [...cryptoType, ...currencyType]
  );
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(0);
        }
      })
      .catch(e => reject(e));
  });
};

export const updateCurrencyPrice = () => {
  let toSyms = ['USD', 'EUR'];

  return new Promise((resolve, reject) => {
    axios
      .get(cryptoRealtimeRequestUrl(cryptoType, toSyms))
      .then(response => {
        if (response.status === 200) {
          cachedCryptoPrice = response.data;
          resolve(1);
        } else {
          console.log('Fetch cryptocurrency price failed!!!');
          resolve(0);
        }
      })
      .catch(e => reject(e));
  });
};
