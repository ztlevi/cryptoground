import * as actionTypes from './actionTypes';

export const updateUserInfo = payload => {
  return {
    type: actionTypes.UPDATE_USER_INFO,
    payload: payload,
  };
};

export const updateUserBalance = payload => {
  return {
    type: actionTypes.UPDATE_USER_BALANCE,
    payload: payload,
  };
};

export const sagaSyncUserBalance = () => {
  return {
    type: actionTypes.SAGA_SYNC_USER_BALANCE,
  };
};

export const sagaSyncUserInfo = () => {
  return {
    type: actionTypes.SAGA_SYNC_USER_INFO,
  };
};

export const sagaRequestTrading = payload => {
  return {
    type: actionTypes.SAGA_REQUEST_TRADING,
    payloda: payload,
  };
};

export const updateTradingList = tradingList => {
  return {
    type: actionTypes.UPDATE_USER_TRADINGS,
    tradingList: tradingList,
  };
};
