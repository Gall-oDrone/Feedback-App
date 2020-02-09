import {
  GET_USER_PROFILE_INFO_START,
  GET_USER_PROFILE_INFO_FAIL,
  GET_USER_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_START,
  GET_PROFILE_INFO_FAIL,
  GET_PROFILE_INFO_SUCCESS,
  PUT_PROFILE_INFO_START,
  PUT_PROFILE_INFO_SUCCESS,
  PUT_PROFILE_INFO_FAIL
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false
};

const getProfileMRIStart = (state, action) => {
  console.log("1) Reducers getProfileMRIStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileMRISuccess = (state, action) => {
  console.log("2) Reducers getProfileMRISuccess")
  console.log("3) Reducers getProfileMRISuccess action: "+JSON.stringify(action))
  return updateObject(state, {
    ProfileMRI: action.data,
    error: null,
    loading: false
  });
};

const getProfileMRIFail = (state, action) => {
  console.log("4) Reducers getProfileMRIFail")
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileAccountInfoStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileAccountInfoSuccess = (state, action) => {
  console.log("2) Reducers getProfileAccountInfoSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    // currentArticle: action.article,
    UserAccountInfo: action.data,
    error: null,
    loading: false
  });
};

const getProfileAccountInfoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createMeetingStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createMeetingSuccess = (state, action) => {
  console.log("2) Reducers createMeetingSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createMeetingFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileAccountInfoStart = (state, action) => {
  console.log("1) Reducers getProfileMRIStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileAccountInfoSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    commentData: action.data,
    error: null,
    loading: false
  });
};

const putProfileAccountInfoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_INFO_START:
      return getProfileMRIStart(state, action);
    case GET_USER_PROFILE_INFO_SUCCESS:
      return getProfileMRISuccess(state, action);
    case GET_USER_PROFILE_INFO_FAIL:
      return getProfileMRIFail(state, action);
    case GET_PROFILE_INFO_START:
      return getProfileAccountInfoStart(state, action);
    case GET_PROFILE_INFO_FAIL:
      return getProfileAccountInfoFail(state, action);
    case GET_PROFILE_INFO_SUCCESS:
      return getProfileAccountInfoSuccess(state, action);
    case PUT_PROFILE_INFO_START:
      return putProfileAccountInfoStart(state, action);
    case PUT_PROFILE_INFO_SUCCESS:
      return putProfileAccountInfoSuccess(state, action);
    case PUT_PROFILE_INFO_FAIL:
      return putProfileAccountInfoFail(state, action);
    default:
      return state;
  }
};

export default reducer;