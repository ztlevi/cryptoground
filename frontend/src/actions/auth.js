import * as actionTypes from './actionTypes';

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = payload => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: payload,
  };
};

export const authFail = payload => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: payload,
  };
};

export const sagaSignUp = (userName, passWord) => {
  return {
    type: actionTypes.SAGA_SIGN_UP,
    payload: {
      userName: userName,
      passWord: passWord,
    },
  };
};

export const sagaSignIn = (userName, passWord) => {
  return {
    type: actionTypes.SAGA_SIGN_IN,
    payload: {
      userName: userName,
      passWord: passWord,
    },
  };
};
