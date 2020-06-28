import {
  GET_PROFILE_SESSIONS_LIST_FAIL,
  GET_PROFILE_SESSIONS_LIST_SUCCESS,
  GET_PROFILE_SESSION_DETAIL_FAIL,
  GET_PROFILE_SESSION_DETAIL_SUCCESS,
  PUT_PROFILE_SESSION_DETAIL_FAIL,
  PUT_PROFILE_SESSION_DETAIL_SUCCESS,
  DELETE_PROFILE_SESSION_DETAIL_FAIL,
  DELETE_PROFILE_SESSION_DETAIL_SUCCESS
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  sessions: [],
  currentSession: {},
  error: null,
  loading: false
};

const getProfileSessionListSuccess = (state, action) => {
  console.log("2) Reducers getProfileSessionListSuccess")
  return updateObject(state, {
    articleList: action.data,
    error: null,
    loading: false
  });
};

const getProfileSessionListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileSessionDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileSessionDetailSuccess")
  return updateObject(state, {
    articleDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileSessionDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteProfileSessionDetailSuccess = (state, action) => {
  console.log("2) Reducers deleteProfileSessionDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const deleteProfileSessionDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SESSIONS_LIST_FAIL:
      return getProfileSessionListFail(state, action);
    case GET_PROFILE_SESSIONS_LIST_SUCCESS:
      return getProfileSessionListSuccess(state, action);
    // case GET_PROFILE_SESSION_DETAIL_START:
    //   return getProfileSessionDetailStart(state, action);
    case GET_PROFILE_SESSION_DETAIL_FAIL:
      return getProfileSessionDetailFail(state, action);
    case GET_PROFILE_SESSION_DETAIL_SUCCESS:
      return getProfileSessionDetailSuccess(state, action);
    case DELETE_PROFILE_SESSION_DETAIL_SUCCESS:
      return deleteProfileSessionDetailSuccess(state, action);
    case DELETE_PROFILE_SESSION_DETAIL_FAIL:
      return deleteProfileSessionDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
