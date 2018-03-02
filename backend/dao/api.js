import * as axios from 'axios';

import { cryptoType } from '../res/cryptoConfigs';
import { cryptoRealtimeRequestUrl } from '../utils/cryptoDataUrls';

export let cachedCryptoPrice = null;

export const updateCurrencyPrice = () => {
  let fromSyms = ['USD'];

  return new Promise((resolve, reject) => {
    axios
      .get(cryptoRealtimeRequestUrl(fromSyms, cryptoType))
      .then(response => {
        if (response.status === 200) {
          console.log('Fetch cryptocurrency price succeed!!!');
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
