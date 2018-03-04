import * as actionTypes from '../actions/actionTypes';
import * as userApi from '../dao/user';

const initialState = {
  leaderBoard: [],
  rank: -1,
};

const updateLeaderBoard = (state, action) => {
  console.log('in reducer', action.payload.leaderBoard);
  return {
    ...state,
    leaderBoard: [...action.payload.leaderBoard],
    rank: parseInt(
      userApi.findRank(action.payload.email, action.payload.leaderBoard)
    ),
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
