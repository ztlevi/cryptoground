export const cryptoRootUrl = 'https://min-api.cryptocompare.com/data';
export const localHost = 'http://localhost:4000';
export const heroku = 'https://cryptoground-backend.herokuapp.com';

export const localhostGetPriceUrl = `${localHost}/get_price`;
export const localhostTradingRequestUrl = `${localHost}/trading_request`;
export const localhostCancelTradingUrl = `${localHost}/cancel_trading`;
export const localhostLeaderBoardUrl = `${localHost}`;

export const herokuUrlGetPriceUrl = `${heroku}/get_price`;
export const herokuTradingRequestUrl = `${heroku}/trading_request`;
export const herokuCancelTradingUrl = `${heroku}/cancel_trading`;
export const herokuLeaderBoardUrl = `${heroku}/leaderboard`;

/**
 * generate crypto request to fetch multiple symbols price
 * @param fromSyms: Array
 * @param toSyms: Array
 * @returns {string}
 */
export const cryptoRealtimeRequestUrl = (fromSyms: Array, toSyms: Array) => {
  return `${cryptoRootUrl}/pricemulti?fsyms=${fromSyms.join()}&tsyms=${toSyms.join()}`;
};

// generate crypto request to fetch multiple symbols price
export const cryptoBatchRequestUrl = (
  fromSym,
  toSym,
  intervalType,
  limit,
  aggregate = 1
) => {
  return `${cryptoRootUrl}/histo${intervalType}?fsym=${fromSym}&tsym=${toSym}&aggregate=${aggregate}&limit=${limit}`;
};
