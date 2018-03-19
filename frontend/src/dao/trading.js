import axios from 'axios';

import * as cryptoUrls from '../res/cryptoDataUrls';

export const requestTrading = payload => {
  let url = cryptoUrls.localhostTradingRequestUrl;
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const cancelTrading = payload => {
  let url = cryptoUrls.localhostCancelTradingUrl;
  console.log('payload', payload);
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
