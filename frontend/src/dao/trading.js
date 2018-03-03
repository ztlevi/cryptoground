import axios from 'axios';

import * as cryptoUrls from '../res/cryptoDataUrls';
import * as cryptoConfigs from '../res/cryptoConfigs';
import * as firebaseConfigs from '../res/firebaseConfigs';
import * as firebaseUrls from '../res/firebaseUrls';

const requestTrading = payload => {
  let url = cryptoUrls.localhostTradingRequestUrl;
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
