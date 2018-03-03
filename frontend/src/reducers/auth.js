import * as actionTypes from '../actions/actionTypes';

const initialState = {
  uid: null,
  idToken: null,
  refreshToken: null,
  error: null,
  errorMsg: null,
  loading: false,
};

const authInit = (state, action) => {
  return { ...initialState };
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    errorMsg: null,
    loading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    uid: action.payload.localId,
    idToken: action.payload.idToken,
    refreshToken: action.payload.refreshToken,
    error: null,
    errorMsg: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    uid: null,
    idToken: null,
    refreshToken: null,
    error: action.payload.error,
    errorMsg: action.payload.errorMsg,
    loading: false,
  };
};

// const authLogout = (state, action) => {
//   return { ...initialState };
// };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      console.log('reducer init');
      return authInit(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default authReducer;
