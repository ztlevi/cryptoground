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

export function* sagaSyncUserBalance() {
  try {
    const state = yield select();
    if (state.auth.uid) {
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

export default [
  takeEvery(actionTypes.SAGA_SYNC_USER_BALANCE, sagaSyncUserBalance),
  takeEvery(actionTypes.SAGA_SYNC_USER_INFO, sagaSyncUserInfo),
];
