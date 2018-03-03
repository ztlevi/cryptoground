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

export const sagaSyncUserBalance = payload => {
  return {
    type: actionTypes.UPDATE_USER_BALANCE,
    payload: payload,
  };
};

export const sagaSyncUserInfo = () => {
  return {
    type: actionTypes.SAGA_SYNC_USER_INFO,
  };
};
