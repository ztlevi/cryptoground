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

export function* sagaSyncUserBalance() {
  yield 1;
}

export default [
  takeEvery(actionTypes.SAGA_SYNC_USER_BALANCE, sagaSyncUserBalance),
];
