import axios from "axios";
import {
  GET_USER_COLLABORATION_LIST_START,
  GET_USER_COLLABORATION_LIST_FAIL,
  GET_USER_COLLABORATION_LIST_SUCCESS,
  PUT_USER_COLLABORATION_START,
  PUT_USER_COLLABORATION_FAIL,
  PUT_USER_COLLABORATION_SUCCESS,
} from "../actions/actionTypes";

import { updateObject } from "../utility";

const initialState = {
  collabs: [],
  error: null,
  loading: false
};

const getCollaborationListStart = (state, action) => {
  console.log("1) Reducers getCollaborationListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCollaborationListSuccess = (state, action) => {
  console.log("2) Reducers getCollaborationListSuccess")
  return updateObject(state, {
    collabs: action.meetingList,
    error: null,
    loading: false
  });
};

const getCollaborationListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCollaborationStart = (state, action) => {
  console.log("1) Reducers createCollaborationStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCollaborationSuccess = (state, action) => {
  console.log("2) Reducers createCollaborationSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCollaborationFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putCollaborationStart = (state, action) => {
  console.log("1) Reducers putCollaborationStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putCollaborationSuccess = (state, action) => {
  console.log("2) Reducers putCollaborationSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putCollaborationFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COLLABORATION_LIST_START:
      return getCollaborationListStart(state, action);
    case GET_USER_COLLABORATION_LIST_SUCCESS:
      return getCollaborationListSuccess(state, action);
    case GET_USER_COLLABORATION_LIST_FAIL:
      return getCollaborationListFail(state, action);
    // case CREATE_USER_COLLABORATION_START:
    //   return createCollaborationStart(state, action);
    // case CREATE_USER_COLLABORATION_SUCCESS:
    //   return createCollaborationSuccess(state, action);
    // case CREATE_USER_COLLABORATION_FAIL:
    //   return createCollaborationFail(state, action);
    case PUT_USER_COLLABORATION_START:
      return putCollaborationStart(state, action);
    case PUT_USER_COLLABORATION_SUCCESS:
      return putCollaborationSuccess(state, action);
    case PUT_USER_COLLABORATION_FAIL:
      return putCollaborationFail(state, action);
    default:
      return state;
  }
};

export default reducer;
