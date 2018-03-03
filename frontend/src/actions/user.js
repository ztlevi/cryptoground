import * as actionTypes from './actionTypes';

export const sagaSyncUserInfo = () => {
  return {
    type: actionTypes.SAGA_SYNC_USER_INFO,
  };
};

export const sagaSyncUserBalance = () => {
  return {
    type: actionTypes.SAGA_SYNC_USER_BALANCE,
  };
};
