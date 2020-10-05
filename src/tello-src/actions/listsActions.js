import { CONSTANTS } from ".";
import {v4 as uuid} from "uuid";
import axios from 'axios';
import { trelloListCreateURL, trelloListListURL, trelloListUpdateURL } from "../../constants";

export const addList = (title, token, boardID) => {
  return (dispatch, getState) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.post(trelloListCreateURL(boardID), {title})
      .then(res => {
        if (res.status === 201) {
          const boardID = getState().activeBoard;
          const id = res.data
          dispatch({
            type: CONSTANTS.ADD_LIST,
            payload: { title, boardID, id }
          });
        }
      })
      .catch(error => console.error(error))
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID
      }
    });
  };
};

export const editTitle = (listID, newTitle, token) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.put(trelloListUpdateURL(boardID), {newTitle, listID})
      .then(res => {
        if (res.status === 200) {
          const id = res.data
          dispatch({
            type: CONSTANTS.EDIT_LIST_TITLE,
            payload: {
              listID,
              newTitle
            }
          });
        }
      })
      .catch(error => console.error(error))
  };
};

export const deleteList = (listID, token) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.delete(trelloListUpdateURL(boardID), {data: {listID: listID}})
      .then(res => {
        if (res.status === 200) {
          const id = res.data
          dispatch({
            type: CONSTANTS.DELETE_LIST,
            payload: {
              listID,
              boardID
            }
          });
        }
      })
      .catch(error => console.error(error))
  };
};

const getListSuccess = (lists, boardId) => {
  if(lists[0].action){
    return {
      type: CONSTANTS.FETCH_NO_LISTS, 
      payload: { lists, boardId }
    };  
  } else {
    return {
      type: CONSTANTS.FETCH_LISTS, 
      payload: { lists, boardId }
    };
  }
};

export const fetchLists = ( token, boardId ) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.get(trelloListListURL(boardId))
      .then(res => {
        if (res.status === 200) {
          console.log("MR CORSO: ", res.data)
          const lists = res.data
          dispatch (getListSuccess(lists, boardId))
        }
      })
      .catch(error => console.error(error))
      console.log('Error');
  }
}
