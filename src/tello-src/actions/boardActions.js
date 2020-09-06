import { CONSTANTS } from ".";
import {v4 as uuid} from "uuid";

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const addBoard = title => {
  const id = uuid();
  // console.log("ar caca 1", id)
  return {
    type: CONSTANTS.ADD_BOARD,
    payload: { title, id }
  };
};
