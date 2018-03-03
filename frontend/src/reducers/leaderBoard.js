import * as actionTypes from '../actions/actionTypes';
import * as userApi from '../dao/user';

const initialState = {
  leaderBoard: null,
  rank: -1,
};

const updateLeaderBoard = (state, action) => {
  return {
    ...initialState,
    leaderBoard: action.leaderBoard,
    rank: userApi.findRank(action.payload.email, action.payload.leaderBoard),
  };
};

const leaderBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LEADER_BOARD:
      return updateLeaderBoard(state, action);
    default:
      return state;
  }
};

export default leaderBoardReducer;
