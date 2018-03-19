import {
  take,
  put,
  call,
  fork,
  cancel,
  cancelled,
  select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as dataActions from '../actions/data';
import * as dataApi from '../dao/data';
import * as actionTypes from '../actions/actionTypes';
import * as cryptoConfigs from '../res/cryptoConfigs';
import { sagaSyncLeaderBoard } from './user';

function* realTimePricingSyncBackend() {
  try {
    while (true) {
      const data = yield call(dataApi.fetchRealTimePriceFromBackend);
      // console.log(data);
      yield put(dataActions.updateRealTimePricing(data));
      // const state = yield select();
      // console.log(state);
      // console.log('state', state.data.realTimePrice);
      yield call(delay, 5000);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      console.log('Task finished');
    }
  }
}

function* realTimePricingSyncApi() {
  try {
    while (true) {
      let fromSyms = cryptoConfigs.cryptoType;
      let toSyms = cryptoConfigs.currencyType;
      const data = yield call(
        dataApi.fetchRealTimePriceFromApi,
        fromSyms,
        toSyms
      );
      //console.log(data);
      yield put(dataActions.updateRealTimePricing(data));
      //const state = yield select();
      //console.log('state', state.data.realTimePrice);
      yield call(delay, 5000);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      console.log('Task finished');
    }
  }
}

function* batchDataDaylySyncApi() {
  try {
    while (true) {
      let fromSym = cryptoConfigs.cryptoType[0]; // BTC
      let toSym = cryptoConfigs.currencyType[0]; // USD
      const data = yield call(
        dataApi.fetchDailyBatchDataFromApi,
        fromSym,
        toSym,
        1
      ); //Num of years
      //console.log(data);
      let postData = {};
      postData[fromSym] = {};
      postData[fromSym][toSym] = {};
      postData[fromSym][toSym][cryptoConfigs.intervalType.dayly] = data;
      //console.log('postdata', postData);
      yield put(dataActions.updateBatchData(postData));
      //const state = yield select();
      //console.log('post state', state.data.batchData);
      yield call(delay, 1000 * 3600);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      console.log('Task finished');
    }
  }
}

function* batchDataIntradaySyncApi() {
  try {
    while (true) {
      let fromSym = cryptoConfigs.cryptoType[0]; // BTC
      let toSym = cryptoConfigs.currencyType[0]; // USD
      const data = yield call(
        dataApi.fetchIntradayBatchDataFromApi,
        fromSym,
        toSym,
        1
      ); //Num of years
      //console.log(data);
      let postData = {};
      postData[fromSym] = {};
      postData[fromSym][toSym] = {};
      postData[fromSym][toSym][cryptoConfigs.intervalType.minute] = data;
      //console.log('postdata', postData);
      yield put(dataActions.updateBatchData(postData));
      const state = yield select();
      console.log('post state', state.data.batchData);
      yield call(delay, 1000 * 60);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      console.log('Task finished');
    }
  }
}

export function* sagaBatchIntradayTask() {
  console.log('Saga Batch intraday started');
  while (yield take(actionTypes.SAGA_START_SYNC_BATCH_INTRADAY_DATA)) {
    console.log('Start fetching batch intraday');
    // Start fetching
    const batchDataIntradayTask = yield fork(batchDataIntradaySyncApi);
    // Receive stop signal
    yield take(actionTypes.SAGA_STOP_SYNC_BATCH_INTRADAY_DATA);
    console.log('Finish fetching');

    // Cancel task
    yield cancel(batchDataIntradayTask);
  }
}

export function* sagaBatchDaylyTask() {
  console.log('Saga Batch dayly started');
  while (yield take(actionTypes.SAGA_START_SYNC_BATCH_DAYLY_DATA)) {
    console.log('Start fetching batch dayly');
    // Start fetching
    const batchDataDaylyTask = yield fork(batchDataDaylySyncApi);

    // Receive stop signal
    yield take(actionTypes.SAGA_STOP_SYNC_BATCH_DAYLY_DATA);
    console.log('Finish fetching');

    // Cancel task
    yield cancel(batchDataDaylyTask);
  }
}

export function* sagaRealTimeTask() {
  console.log('Saga realtime started');
  while (yield take(actionTypes.SAGA_START_SYNC_REAL_TIME_PRICING)) {
    console.log('Start fetching realtime');
    // Start fetching
    const syncRealTimePricingTask = yield fork(realTimePricingSyncBackend);

    // Receive stop signal
    yield take(actionTypes.SAGA_STOP_SYNC_REAL_TIME_PRICING);
    console.log('Finish fetching realtime');
    // Cancel task
    yield cancel(syncRealTimePricingTask);
  }
}

export function* sagaSyncLeaderBoardTask() {
  console.log('Saga sync leaderboard started');
  while (yield take(actionTypes.SAGA_START_SYNC_LEADER_BOARD)) {
    console.log('Start fetching leaderBoard');
    const syncLeaderBoardTask = yield fork(sagaSyncLeaderBoard);

    // Receive stop signal
    yield take(actionTypes.SAGA_STOP_SYNC_LEADER_BOARD);
    console.log('Finish fetching leaderBoard');

    yield cancel(syncLeaderBoardTask);
  }
}
