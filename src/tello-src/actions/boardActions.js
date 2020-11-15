import { CONSTANTS } from ".";
import {v4 as uuid} from "uuid";
import axios from 'axios';
import { boardCreateURL, boardListURL } from "../../constants";

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

const postBoardSuccess = (title, id) => {
  console.log("Actions postBoardSuccess")
  return {
    type: CONSTANTS.ADD_BOARD,
    payload: { title, id }
  };
};

export const addBoard = (title, token) => {
  return dispatch => {
    var id = uuid();
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.post(boardCreateURL, {title})
      .then(res => {
        if (res.status === 201) {
          id = res.data
          dispatch(postBoardSuccess(title, id))
        }
      })
      .catch(error => console.error(error))
      console.log('Error');
      // return {
      //   type: CONSTANTS.ADD_BOARD,
      //   payload: { title, id }
      // };
  }
};

const getBoardListSuccess = (boards) => {
  console.log("RERAMIRE: ", boards)
  return {
    type: CONSTANTS.FETCH_BOARDS,
    payload: { boards }
  };
};

export const fetchBoardList = ( username, token ) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.get(boardListURL(username))
      .then(res => {
        if (res.status === 200) {
          const boards = res.data
          dispatch (getBoardListSuccess(boards))
        }
      })
      .catch(error => console.error(error))
      console.log('Error');
  }
}
