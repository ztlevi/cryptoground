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
    payload: payload,
  };
};

export const sagaSyncTradingList = () => {
  return {
    type: actionTypes.SAGA_SYNC_USER_TRADINGS,
  };
};

export const updateTradingList = tradingList => {
  return {
    type: actionTypes.UPDATE_USER_TRADINGS,
    tradingList: tradingList,
  };
};

export const updateLeaderBoard = payload => {
  return {
    type: actionTypes.UPDATE_LEADER_BOARD,
    payload: payload,
  };
};

export const sagaSyncLeaderBoard = () => {
  return {
    type: actionTypes.SAGA_SYNC_LEADER_BOARD,
  };
};

export const toggleTradingResponseModal = (info, isOpen) => {
  return {
    type: actionTypes.TOGGLE_TRADING_RESPONSE_MODAL,
    info: info,
    isOpen: isOpen,
  };
};
