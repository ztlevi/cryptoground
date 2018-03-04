export const cryptoRootUrl = 'https://min-api.cryptocompare.com/data';

export const cryptoRealTimeSinglePriceUrl = (
  fromSym: string,
  toSym: string
) => {
  return `${cryptoRootUrl}/price?fsym=${fromSym}&tsyms=${toSym}`;
};

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
