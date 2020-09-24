import axios from "axios";
import {
  GET_USER_COLLABORATION_LIST_START,
  GET_USER_COLLABORATION_LIST_FAIL,
  GET_USER_COLLABORATION_LIST_SUCCESS,
  PUT_USER_COLLABORATION_START,
  PUT_USER_COLLABORATION_FAIL,
  PUT_USER_COLLABORATION_SUCCESS,
} from "./actionTypes";
import { UserListCollaborationRequestURL, UserCollaborationRequestUpdateURL } from "../../constants";

const getUserCollaborationListStart = () => {
  return {
    type: GET_USER_COLLABORATION_LIST_START
  };
};

const getUserCollaborationListSuccess = meetingList => {
  console.log("getUserCollaborationListSuccess at actions: ", meetingList)
  return {
    type: GET_USER_COLLABORATION_LIST_SUCCESS,
    meetingList
  };
};

const getUserCollaborationListFail = error => {
  return {
    type: GET_USER_COLLABORATION_LIST_FAIL,
    error: error
  };
};

export const getUserCollaborations = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getUserCollaborationListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(UserListCollaborationRequestURL(username))
      .then(res => {
        const meetingList = res.data;
        dispatch(getUserCollaborationListSuccess(meetingList));
      })
      .catch(err => {
        dispatch(getUserCollaborationListFail(err));
      });
  };
};

const putUserCollaborationListStart = () => {
  return {
    type: PUT_USER_COLLABORATION_START
  };
};

const putUserCollaborationListSuccess = meetingList => {
  return {
    type: PUT_USER_COLLABORATION_SUCCESS,
    meetingList
  };
};

const putUserCollaborationListFail = error => {
  return {
    type: PUT_USER_COLLABORATION_FAIL,
    error: error
  };
};

export const putCollaborationRequest = (username, token, obj) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(putUserCollaborationListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .put(UserListCollaborationRequestURL(username), obj)
      .then(res => {
        console.log("EHRENO")
        const meetingList = res.data;
        console.log("EHRENO 2")
        dispatch(putUserCollaborationListSuccess(meetingList));
      })
      .catch(err => {
        dispatch(putUserCollaborationListFail(err));
      });
  };
};