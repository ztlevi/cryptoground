import * as axios from 'axios';
import * as ApiUrls from '../res/cryptoDataUrls';

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
