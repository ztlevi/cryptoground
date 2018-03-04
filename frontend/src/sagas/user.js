import {
  take,
  put,
  call,
  fork,
  cancel,
  cancelled,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as dataActions from '../actions/data';
import * as dataApi from '../dao/data';
import * as actionTypes from '../actions/actionTypes';
import * as cryptoConfigs from '../res/cryptoConfigs';
import * as userActions from '../actions/user';
import * as userApi from '../dao/user';
import * as tradingApi from '../dao/trading';

export function* sagaSyncUserBalance() {
  try {
    const state = yield select();
    console.log('saga Sync user balance');
    if (state.auth.uid && state.auth.idToken) {
      const balanceData = yield call(
        userApi.fetchUserBalance,
        state.auth.uid,
        state.auth.idToken
      );
      yield put(userActions.updateUserBalance({ balance: balanceData }));
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

export function* sagaSyncUserInfo() {
  yield 1;
}

export function* sagaSyncTradingList() {
  try {
    const state = yield select();
    const { uid, idToken } = state.auth;
    if (!uid || !idToken) {
      return;
    }
    const tradingList = yield call(userApi.fetchUserTradingList, uid, idToken);

    // Update local trading list
    console.log('tradingList', tradingList);
    yield put(userActions.updateTradingList(tradingList));
  } catch (err) {
    console.log(err);
  }
}

export function* sagaRequestTrading(action) {
  try {
    const state = yield select();
    const { uid, idToken } = state.auth;
    if (!uid || !idToken) {
      return;
    }
    console.log('post trading request', action.payload);
    yield 1;
    // Request trading
    const res = yield call(tradingApi.requestTrading, action.payload);

    console.log('response of trading request', res);

    yield put(userActions.toggleTradingResponseModal(res.message, true));

    // Update balance account
    yield call(sagaSyncUserBalance);

    // Fetch trading list from firebase
    const tradingList = yield call(userApi.fetchUserTradingList, uid, idToken);

    // Update local trading list
    //console.log('tradingList', tradingList);
    yield put(userActions.updateTradingList(tradingList));
  } catch (err) {
    console.log(err);
  }
}

export function* sagaCancelTrading(action) {
  try {
    const state = yield select();
    const { uid, idToken } = state.auth;
    if (!uid || !idToken) {
      return;
    }

    console.log('Start cancel trading');
    const res = yield call(tradingApi.cancelTrading, action.payload);

    yield put(userActions.toggleTradingResponseModal(res.data.message, true));

    console.log('Cancel result', res);
    // Update balance account
    yield call(sagaSyncUserBalance);

    // Fetch trading list from firebase
    const tradingList = yield call(userApi.fetchUserTradingList, uid, idToken);

    // Update local trading list
    //console.log('tradingList', tradingList);
    yield put(userActions.updateTradingList(tradingList));
  } catch (err) {
    console.log(err);
  }
}
export const fakeLeaderBoard = () => {
  let leaderBoard = [];
  for (let i = 0; i < 200; ++i) {
    leaderBoard.push({ userName: i.toString() });
  }
  return leaderBoard;
};

export function* sagaSyncLeaderBoard() {
  try {
    while (true) {
      console.log('saga loading leader board');
      const state = yield select();
      const { idToken } = state.auth;
      const { email } = state.user;
      // if (!uid || !idToken) {
      //   console.log('no token');
      //   return;
      // }
      //const leaderBoard = fakeLeaderBoard();

      const leaderBoard = yield call(userApi.fetchLeaderBoard, idToken);
      //console.log('saga leaderBoard', leaderBoard);
      yield put(
        userActions.updateLeaderBoard({
          email: email,
          leaderBoard: leaderBoard,
        })
      );
      yield call(delay, 60 * 1000 * 2);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      console.log('Task finished');
    }
  }
}

export default [
  takeEvery(actionTypes.SAGA_SYNC_USER_BALANCE, sagaSyncUserBalance),
  takeEvery(actionTypes.SAGA_SYNC_USER_INFO, sagaSyncUserInfo),
  takeEvery(actionTypes.SAGA_REQUEST_TRADING, sagaRequestTrading),
  takeEvery(actionTypes.SAGA_SYNC_USER_TRADINGS, sagaSyncTradingList),
  //takeEvery(actionTypes.SAGA_SYNC_LEADER_BOARD, sagaSyncLeaderBoard),
  takeEvery(actionTypes.SAGA_CANCEL_TRADING, sagaCancelTrading),
];
