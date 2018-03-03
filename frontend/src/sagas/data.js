import { take, put, call, fork, cancel, cancelled, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import * as dataActions from '../actions/data';
import * as dataApi from '../dao/data';
import * as actionTypes from '../actions/actionTypes';
import * as cryptoConfigs from '../res/cryptoConfigs';

function* realTimePricingSyncBackend() {
    try {
        while(true) {
            const data = yield call(dataApi.fetchRealTimePriceFromBackend);
            // console.log(data);
            yield put( dataActions.updateRealTimePricing( data ));
            const state = yield select();
            // console.log(state);
            // console.log('state', state.data.realTimePrice);
            yield call( delay, 5000 );  
        }
    } catch (err) {
        console.log(err);
    } finally {
        if(yield cancelled()){
            console.log('Task finished');
        }
    }
}

function* realTimePricingSyncApi() {
    try{
        while(true) {
            let fromSyms = cryptoConfigs.cryptoType;
            let toSyms = cryptoConfigs.currencyType;
            const data = yield call(dataApi.fetchRealTimePriceFromApi, fromSyms, toSyms);
            console.log(data);
            yield put( dataActions.updateRealTimePricing( data ));
            const state = yield select();
            console.log('state', state.data.realTimePrice);
            yield call( delay, 5000 );
        }
    } catch (err) {
        console.log(err);
    }
}

function* batchDataSyncApi() {
    try{
        while(true) {
            let fromSym = cryptoConfigs.cryptoType[0]; // BTC
            let toSym = cryptoConfigs.currencyType[0]; // USD
            const data = yield call(dataApi.fetchDailyBatchDataFromApi, fromSym, toSym);
            console.log(data);
            yield put( dataActions.updateRealTimePricing( data ));
            const state = yield select();
            console.log('state', state.data.realTimePrice);
            yield call( delay, 5000 );
        }
    } catch (err) {
        console.log(err);
    }
}

export function* sagaBatchDaylyTask() {
    console.log('Saga Batch started');
    while( yield take(actionTypes.SAGA_START_SYNC_BATCH_DATA)){
        console.log('Start fetching batch');

    }
}

export function* sagaRealTimeTask() {
    console.log('Saga realtime started');
    while( yield take(actionTypes.SAGA_START_SYNC_REAL_TIME_PRICING) ){
        console.log('Start fetching realtime');
        // Start fetching 
        const syncRealTimePricingTask = yield fork(realTimePricingSyncBackend);

        // Receive stop signal
        yield take(actionTypes.SAGA_STOP_SYNC_REAL_TIME_PRICING) 
        console.log('Finish fetching');
        // Cancel task
        yield cancel(syncRealTimePricingTask);
    }
}


