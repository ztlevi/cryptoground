import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tradingList: [],
};

const updateTradingList = (state, action) => {
  return {
    ...state,
    tradingList: action.tradingList,
  };
};

const tradingsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_TRADINGS:
      return updateTradingList(state, action);
    default:
      return state;
  }
};
