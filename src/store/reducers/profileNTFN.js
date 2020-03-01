import {
  GET_PROFILE_NOTIFICATION_LIST_START,
  GET_PROFILE_NOTIFICATIONS_LIST_FAIL,
  GET_PROFILE_NOTIFICATIONS_LIST_SUCCESS,
  GET_PROFILE_NOTIFICATION_DETAIL_START,
  GET_PROFILE_NOTIFICATION_DETAIL_FAIL,
  GET_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
  PUT_PROFILE_NOTIFICATION_LIST_START,
  PUT_PROFILE_NOTIFICATION_LIST_FAIL,
  PUT_PROFILE_NOTIFICATION_LIST_SUCCESS,
  PUT_PROFILE_NOTIFICATION_DETAIL_START,
  PUT_PROFILE_NOTIFICATION_DETAIL_FAIL,
  PUT_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
  DELETE_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
  DELETE_PROFILE_NOTIFICATION_DETAIL_FAIL
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  loading2: false
};

const getProfileNotificationListStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileNotificationListSuccess = (state, action) => {
  console.log("2) Reducers getProfileNotificationListSuccess")
  return updateObject(state, {
    notificationList: action.data,
    error: null,
    loading: false
  });
};

const getProfileNotificationListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileNotificationDetailStart = (state, action) => {
  console.log("1) Reducers getProfileNotificationDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileNotificationDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileNotificationDetailSuccess")
  return updateObject(state, {
    articleDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileNotificationDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileNotificationListStart = (state, action) => {
  console.log("1) Reducers putProfileNotificationDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileNotificationListSuccess = (state, action) => {
  console.log("2) Reducers putProfileNotificationDetailSuccess")
  return updateObject(state, {
    error: null,
    loading2: false
  });
};

const putProfileNotificationListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading2: false
  });
};

const putProfileNotificationDetailStart = (state, action) => {
  console.log("1) Reducers putProfileNotificationDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileNotificationDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileNotificationDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileNotificationDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteProfileNotificationDetailSuccess = (state, action) => {
  console.log("2) Reducers deleteProfileNotificationDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const deleteProfileNotificationDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_NOTIFICATION_LIST_START:
      return getProfileNotificationListStart(state, action);
    case GET_PROFILE_NOTIFICATIONS_LIST_FAIL:
      return getProfileNotificationListFail(state, action);
    case GET_PROFILE_NOTIFICATIONS_LIST_SUCCESS:
      return getProfileNotificationListSuccess(state, action);
    case GET_PROFILE_NOTIFICATION_DETAIL_START:
      return getProfileNotificationDetailStart(state, action);
    case GET_PROFILE_NOTIFICATION_DETAIL_FAIL:
      return getProfileNotificationDetailFail(state, action);
    case GET_PROFILE_NOTIFICATION_DETAIL_SUCCESS:
      return getProfileNotificationDetailSuccess(state, action);
    case PUT_PROFILE_NOTIFICATION_LIST_START:
      return putProfileNotificationListStart(state, action);;
    case PUT_PROFILE_NOTIFICATION_LIST_FAIL:
      return putProfileNotificationListFail(state, action);;
    case PUT_PROFILE_NOTIFICATION_LIST_SUCCESS:
      return putProfileNotificationListSuccess(state, action);
    case PUT_PROFILE_NOTIFICATION_DETAIL_START:
      return putProfileNotificationDetailStart(state, action);
    case PUT_PROFILE_NOTIFICATION_DETAIL_FAIL:
      return putProfileNotificationDetailFail(state, action);
    case PUT_PROFILE_NOTIFICATION_DETAIL_SUCCESS:
      return putProfileNotificationDetailSuccess(state, action);
    case DELETE_PROFILE_NOTIFICATION_DETAIL_SUCCESS:
      return deleteProfileNotificationDetailSuccess(state, action);
    case DELETE_PROFILE_NOTIFICATION_DETAIL_FAIL:
      return deleteProfileNotificationDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;