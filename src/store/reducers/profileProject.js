import {
  GET_PROFILE_PROJECT_LIST_START,
  GET_PROFILE_PROJECT_LIST_SUCCESS,
  GET_PROFILE_PROJECT_LIST_FAIL,
  GET_PROFILE_PROJECT_DETAIL_START,
  GET_PROFILE_PROJECT_DETAIL_FAIL,
  GET_PROFILE_PROJECT_DETAIL_SUCCESS,
  PUT_PROFILE_PROJECT_DETAIL_START,
  PUT_PROFILE_PROJECT_DETAIL_FAIL,
  PUT_PROFILE_PROJECT_DETAIL_SUCCESS,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  projectList: [],

};

const getProfileProjectListStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileProjectListSuccess = (state, action) => {
  console.log("2) Reducers getProfileProjectListSuccess")
  return updateObject(state, {
    projectList: action.data,
    error: null,
    loading: false
  });
};

const getProfileProjectListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileProjectDetailStart = (state, action) => {
  console.log("1) Reducers getProfileProjectDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileProjectDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileProjectDetailSuccess")
  return updateObject(state, {
    projectDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileProjectDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileProjectDetailStart = (state, action) => {
  console.log("1) Reducers putProfileProjectDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileProjectDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileProjectDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileProjectDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_PROJECT_LIST_START:
      return getProfileProjectListStart(state, action);
    case GET_PROFILE_PROJECT_LIST_FAIL:
      return getProfileProjectListFail(state, action);
    case GET_PROFILE_PROJECT_LIST_SUCCESS:
      return getProfileProjectListSuccess(state, action);
    case GET_PROFILE_PROJECT_DETAIL_START:
      return getProfileProjectDetailStart(state, action);
    case GET_PROFILE_PROJECT_DETAIL_FAIL:
      return getProfileProjectDetailFail(state, action);
    case GET_PROFILE_PROJECT_DETAIL_SUCCESS:
      return getProfileProjectDetailSuccess(state, action);
    case PUT_PROFILE_PROJECT_DETAIL_START:
      return putProfileProjectDetailStart(state, action);
    case PUT_PROFILE_PROJECT_DETAIL_FAIL:
      return putProfileProjectDetailFail(state, action);
    case PUT_PROFILE_PROJECT_DETAIL_SUCCESS:
      return putProfileProjectDetailSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;