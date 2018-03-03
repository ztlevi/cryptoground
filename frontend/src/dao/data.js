import * as axios from 'axios';
import * as ApiUrls from '../res/cryptoDataUrls';
import * as cryptoConfigs from '../res/cryptoConfigs';

export const fetchRealTimePriceFromBackend = () => {
    let url = ApiUrls.localhostUrl;
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then( response => resolve(response.data))
        .catch( err => reject(err))
    });
}

export const fetchRealTimePriceFromApi = ( fromSyms, toSyms ) => {
    let url = ApiUrls.cryptoRealtimeRequestUrl( fromSyms, toSyms );
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then( response => resolve(response.data))
        .catch( err => reject(err))
    });
}

// BTC --> USD
export const fetchDailyBatchDataFromApi = (fromSym, toSym, numOfYears) => {
    let numOfDays = 365 * numOfYears;
    let url = ApiUrls.cryptoBatchRequestUrl(fromSym, toSym, 
        cryptoConfigs.intervalType.dayly, numOfDays);
    console.log(url);
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then( response => resolve(response.data) )
        .catch( err => reject(err) );
    });
}

export const fetchIntradayBatchDataFromApi = (fromSym, toSym, numOfDays) => {
    let numOfMinutes = 1440 * numOfDays;
    let url = ApiUrls.cryptoBatchRequestUrl(fromSym, toSym,
        cryptoConfigs.intervalType.minute, numOfMinutes);
    console.log(url);
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then( response => resolve(response.data) )
        .catch( err => reject(err) );
    }); 
}
