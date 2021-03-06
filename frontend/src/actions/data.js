import * as actionTypes from './actionTypes';

export const updateRealTimePricing = data => {
  return {
    type: actionTypes.UPDATE_REAL_TIME_PRICING,
    payload: data,
  };
};

export const updateBatchData = data => {
  return {
    type: actionTypes.UPDATE_BATCH_DATA,
    payload: data,
  };
};

export const sagaSyncRealTimePricing = () => {
  return {
    type: actionTypes.SAGA_START_SYNC_REAL_TIME_PRICING,
  };
};

export const sagaStopSyncRealTimePricing = () => {
  return {
    type: actionTypes.SAGA_STOP_SYNC_REAL_TIME_PRICING,
  };
};

export const sagaStartSyncBatchDaylyData = () => {
  return {
    type: actionTypes.SAGA_START_SYNC_BATCH_DAYLY_DATA,
  };
};

export const sagaStopSyncBatchDaylyData = () => {
  return {
    type: actionTypes.SAGA_STOP_SYNC_BATCH_DAYLY_DATA,
  };
};

export const sagaStartSyncBatchIntradayData = () => {
  return {
    type: actionTypes.SAGA_START_SYNC_BATCH_INTRADAY_DATA,
  };
};

export const sagaStopSyncBatchIntradayData = () => {
  return {
    type: actionTypes.SAGA_STOP_SYNC_BATCH_INTRADAY_DATA,
  };
};

export const sagaStartSyncLeaderBoard = () => {
  return {
    type: actionTypes.SAGA_START_SYNC_LEADER_BOARD,
  };
};

export const sagaStopSyncLeaderBoard = () => {
  return {
    type: actionTypes.SAGA_STOP_SYNC_LEADER_BOARD,
  };
};
