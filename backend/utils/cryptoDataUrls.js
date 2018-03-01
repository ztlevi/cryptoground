export const cryptoRootUrl = 'https://min-api.cryptocompare.com/data';

export const cryptoRealtimeRequestUrl = (fromSym, toSyms: Array) => {
    return `${cryptoRootUrl}/price?fsym=${fromSym}&tsyms=${toSyms.join()}`;
}

export const cryptoBatchRequestUrl = (fromSym, toSym, intervalType, limit, aggregate=1) => {
    return `${cryptoRootUrl}/histo${intervalType}?fsym=${fromSym}&tsym=${toSym}&aggregate=${aggregate}&limit=${limit}`;
}