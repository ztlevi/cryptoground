import * as actionTypes from './actionTypes';

export const updateRealTimePricing = data => {
    return {
        type: actionTypes.UPDATE_REAL_TIME_PRICING,
        payload: data
    }
}

export const updateBatchData = data => {
    return {
        type: actionTypes.UPDATE_BATCH_DATA,
        payload: data
    }
}

export const sagaSyncRealTimePricing = () => {
    return { 
        type: actionTypes.SAGA_START_SYNC_REAL_TIME_PRICING
    }
}

export const sagaFetchBatchData = (fromSym, toSym, interval, limit, aggregate=1) => {
    return {
        type: actionTypes.SAGA_FETCH_BATCH_DATA
    }
}