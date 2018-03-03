import * as actionTypes from '../actions/actionTypes';
import * as cryptoConfig from '../res/cryptoConfigs';

const { cryptoType, currencyType, intervalType } = cryptoConfig;
const initialState = {
  realTimePrice: {},
  batchData: {},
};
// realTimePrice['BTC']['USD'] means 1 BTC worth how much USD
for (let i in cryptoType) {
  initialState.realTimePrice[cryptoType[i]] = {};
  initialState.batchData[cryptoType[i]] = {};
  for (let j in currencyType) {
    initialState.realTimePrice[cryptoType[i]][currencyType[j]] = 0;
    initialState.batchData[cryptoType[i]][currencyType[j]] = {};
    for (let k in intervalType) {
      // batchData['BTC']['USD']['DAYLY']
      // See https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10
      initialState.batchData[cryptoType[i]][currencyType[j]][
        intervalType[k]
      ] = [];
    }
  }
}

console.log('initial state', initialState);
const recurUpdateRealTimePrice = (realTimePrice, payload) => {
  for (let cryp in payload) {
    for (let cur in payload[cryp]) {
      realTimePrice[cryp][cur] = payload[cryp][cur];
    }
  }
  return realTimePrice;
};

// We do batch update for real time pricing
const updateRealTimeData = (state, action) => {
  return {
    ...state,
    realTimePrice: recurUpdateRealTimePrice(
      state.realTimePrice,
      action.payload
    ),
  };
};

const recurUpdateBatchData = (batchData, payload) => {
  for (let cryp in payload) {
    for (let cur in payload[cryp]) {
      for (let inter in payload[cryp][cur]) {
        batchData[cryp][cur][inter] = payload[cryp][cur][inter];
      }
    }
  }
  return batchData;
};

const updateBatchData = (state, action) => {
  return {
    ...state,
    batchData: recurUpdateBatchData(state.batchData, action.payload),
  };
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_REAL_TIME_PRICING:
      return updateRealTimeData(state, action);
    case actionTypes.UPDATE_BATCH_DATA:
      return updateBatchData(state, action);
    default:
      return state;
  }
};

export default dataReducer;
