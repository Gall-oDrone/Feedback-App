import {
  GET_PROFILE_MESSAGE_LIST_START,
  GET_PROFILE_MESSAGES_LIST_FAIL,
  GET_PROFILE_MESSAGES_LIST_SUCCESS,
  GET_PROFILE_MESSAGE_DETAIL_START,
  GET_PROFILE_MESSAGE_DETAIL_FAIL,
  GET_PROFILE_MESSAGE_DETAIL_SUCCESS,
  PUT_PROFILE_MESSAGE_LIST_START,
  PUT_PROFILE_MESSAGE_LIST_FAIL,
  PUT_PROFILE_MESSAGE_LIST_SUCCESS,
  PUT_PROFILE_MESSAGE_DETAIL_START,
  PUT_PROFILE_MESSAGE_DETAIL_FAIL,
  PUT_PROFILE_MESSAGE_DETAIL_SUCCESS,
  DELETE_PROFILE_MESSAGE_DETAIL_SUCCESS,
  DELETE_PROFILE_MESSAGE_DETAIL_FAIL
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  loading2: false
};

const getProfileMessageListStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileMessageListSuccess = (state, action) => {
  console.log("2) Reducers getProfileMessageListSuccess")
  return updateObject(state, {
    messageList: action.data,
    error: null,
    loading: false
  });
};

const getProfileMessageListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileMessageDetailStart = (state, action) => {
  console.log("1) Reducers getProfileMessageDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileMessageDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileMessageDetailSuccess")
  return updateObject(state, {
    articleDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileMessageDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileMessageListStart = (state, action) => {
  console.log("1) Reducers putProfileMessageDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileMessageListSuccess = (state, action) => {
  console.log("2) Reducers putProfileMessageDetailSuccess")
  return updateObject(state, {
    error: null,
    loading2: false
  });
};

const putProfileMessageListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading2: false
  });
};

const putProfileMessageDetailStart = (state, action) => {
  console.log("1) Reducers putProfileMessageDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileMessageDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileMessageDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileMessageDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteProfileMessageDetailSuccess = (state, action) => {
  console.log("2) Reducers deleteProfileMessageDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const deleteProfileMessageDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_MESSAGE_LIST_START:
      return getProfileMessageListStart(state, action);
    case GET_PROFILE_MESSAGES_LIST_FAIL:
      return getProfileMessageListFail(state, action);
    case GET_PROFILE_MESSAGES_LIST_SUCCESS:
      return getProfileMessageListSuccess(state, action);
    case GET_PROFILE_MESSAGE_DETAIL_START:
      return getProfileMessageDetailStart(state, action);
    case GET_PROFILE_MESSAGE_DETAIL_FAIL:
      return getProfileMessageDetailFail(state, action);
    case GET_PROFILE_MESSAGE_DETAIL_SUCCESS:
      return getProfileMessageDetailSuccess(state, action);
    case PUT_PROFILE_MESSAGE_LIST_START:
      return putProfileMessageListStart(state, action);;
    case PUT_PROFILE_MESSAGE_LIST_FAIL:
      return putProfileMessageListFail(state, action);;
    case PUT_PROFILE_MESSAGE_LIST_SUCCESS:
      return putProfileMessageListSuccess(state, action);
    case PUT_PROFILE_MESSAGE_DETAIL_START:
      return putProfileMessageDetailStart(state, action);
    case PUT_PROFILE_MESSAGE_DETAIL_FAIL:
      return putProfileMessageDetailFail(state, action);
    case PUT_PROFILE_MESSAGE_DETAIL_SUCCESS:
      return putProfileMessageDetailSuccess(state, action);
    case DELETE_PROFILE_MESSAGE_DETAIL_SUCCESS:
      return deleteProfileMessageDetailSuccess(state, action);
    case DELETE_PROFILE_MESSAGE_DETAIL_FAIL:
      return deleteProfileMessageDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;