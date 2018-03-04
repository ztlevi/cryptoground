import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tradingResponseModal: {
    isOpen: false,
    text: null,
  },
};

const toggleTradingRequestModal = (state, action) => {
  return {
    ...state,
    tradingResponseModal: {
      isOpen: action.isOpen,
      text: action.isOpen ? action.text : null,
    },
  };
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_TRADING_RESPONSE_MODAL:
      return toggleTradingRequestModal(state, action);
    default:
      return state;
  }
};

export default modalReducer;
