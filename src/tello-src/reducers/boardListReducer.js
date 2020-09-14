import { CONSTANTS } from "../actions";

const initialState = null;

const boardListReducer = (state = initialState, action) => {
  switch (action.type) {

    // case CONSTANTS.DELETE_LIST: {
    //   const { listID, boardID } = action.payload;
    //   console.log("MICAS => ", boardID)
    //   const board = state[boardID];
    //   const lists = board.lists;
    //   const newLists = lists.filter(id => id !== listID);
    //   board.lists = newLists;
    //   return { ...state, [boardID]: board };
    // }

    case CONSTANTS.FETCH_BOARDS: {
      const { boards } = action.payload;
      return { userBoards: boards };
    }

    default:
      return state;
  }
};

export default boardListReducer;
