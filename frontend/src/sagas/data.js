import { take, put, call, fork, cancel, cancelled, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import * as dataActions from '../actions/data';
import * as dataApi from '../dao/data';
import * as actionTypes from '../actions/actionTypes';
import * as cryptoConfigs from '../res/cryptoConfigs';

export function* realTimePricingSyncBackend() {
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

export function* realTimePricingSyncApi() {
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

export function* sagaTask() {
    console.log('Saga started');
    while( yield take(actionTypes.SAGA_START_SYNC_REAL_TIME_PRICING) ){
        console.log('Start fetching');
        // Start fetching 
        const syncRealTimePricingTask = yield fork(realTimePricingSyncBackend);

        // Receive stop signal
        yield take(actionTypes.SAGA_STOP_SYNC_REAL_TIME_PRICING) 
        console.log('Finish fetching');
        // Cancel task
        yield cancel(syncRealTimePricingTask);
    }
}

export default sagaTask;


