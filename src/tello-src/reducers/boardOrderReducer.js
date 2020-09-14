import { CONSTANTS } from "../actions";
import {v4 as uuid} from "uuid";

console.log(uuid());

const initialState = ["board-0"];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      return [...state, `board-${action.payload.id}`];
    }

    case CONSTANTS.FETCH_BOARDS: {
      const { boards } = action.payload;
      const idList = boards.map(el => {
        return( `board-${el.id}`);
      })
      boards.forEach(el => {
        state.push(`board-${el.id}`)
      })
      return [...state]
    }

    default:
      return state;
  }
};

export default boardOrderReducer;
