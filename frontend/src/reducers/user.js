import * as actionTypes from '../actions/actionTypes';
import * as cryptoConfigs from '../res/cryptoConfigs';

const { cryptoType, currencyType } = cryptoConfigs;

const initialState = {
  userName: null,
  email: null,
  balance: {},
};

for (let i in cryptoType) {
  initialState.balance[cryptoType[i]] = 0;
}

for (let i in currencyType) {
  initialState.balance[currencyType[i]] = 0;
}

const updateUserInfo = (state, action) => {
  return {
    ...state,
    userName: action.payload.userName,
    email: action.payload.email,
  };
};

const updateUserBalance = (state, action) => {
  return {
    ...state,
    balance: action.payload.balance,
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_INFO:
      return updateUserInfo(state, action);
    case actionTypes.UPDATE_USER_BALANCE:
      return updateUserBalance(state, action);
    default:
      return state;
  }
};

export default userReducer;
