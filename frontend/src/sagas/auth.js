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
import * as firebaseConfigs from '../res/firebaseConfigs';
import * as authApi from '../dao/auth';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';
import * as userApi from '../dao/user';

export function* sagaSignUp(action: Object) {
  try {
    console.log('sign up...');
    const { userName, passWord } = action.payload;
    yield put(authActions.authStart());
    const authData = yield call(authApi.signUpNewUser, userName, passWord);
    console.log('authData', authData);
    yield put(authActions.authSuccess(authData));
    yield put(
      userActions.updateUserInfo({
        email: userName,
      })
    );
    // Init account balance
    yield call(userApi.initUserBalance, authData.localId, authData.idToken);
    // Fetch Balance
    const balanceData = yield call(
      userApi.fetchUserBalance,
      authData.localId,
      authData.idToken
    );
    yield put(userActions.updateUserBalance({ balance: balanceData }));
  } catch (err) {
    console.log(err);
    yield put(
      authActions.authFail({
        error: err,
        errorMsg: err,
      })
    );
  }
}

export function* sagaSignIn(action: Object) {
  try {
    console.log('sign in...');
    const { userName, passWord } = action.payload;
    yield put(authActions.authStart());
    const authData = yield call(authApi.verifyPassword, userName, passWord);
    console.log('authData', authData);
    yield put(authActions.authSuccess(authData));
    yield put(
      userActions.updateUserInfo({
        email: userName,
      })
    );
    const balanceData = yield call(
      userApi.fetchUserBalance,
      authData.localId,
      authData.idToken
    );
    yield put(userActions.updateUserBalance({ balance: balanceData }));
  } catch (err) {
    console.log(err);
    yield put(
      authActions.authFail({
        error: err,
        errorMsg: err,
      })
    );
  }
}

export default [
  takeEvery(actionTypes.SAGA_SIGN_IN, sagaSignIn),
  takeEvery(actionTypes.SAGA_SIGN_UP, sagaSignUp),
];
