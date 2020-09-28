import {
  GET_PROFILE_WORKSHOP_LIST_START,
  GET_PROFILE_WORKSHOP_LIST_SUCCESS,
  GET_PROFILE_WORKSHOP_LIST_FAIL,
  GET_PROFILE_WORKSHOP_DETAIL_START,
  GET_PROFILE_WORKSHOP_DETAIL_FAIL,
  GET_PROFILE_WORKSHOP_DETAIL_SUCCESS,
  PUT_PROFILE_WORKSHOP_DETAIL_START,
  PUT_PROFILE_WORKSHOP_DETAIL_FAIL,
  PUT_PROFILE_WORKSHOP_DETAIL_SUCCESS,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  workshopList: [],
};

const getProfileWorkshopListStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileWorkshopListSuccess = (state, action) => {
  console.log("2) Reducers getProfileWorkshopListSuccess")
  return updateObject(state, {
    workshopList: action.data,
    error: null,
    loading: false
  });
};

const getProfileWorkshopListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileWorkshopDetailStart = (state, action) => {
  console.log("1) Reducers getProfileWorkshopDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileWorkshopDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileWorkshopDetailSuccess")
  return updateObject(state, {
    workshopDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileWorkshopDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileWorkshopDetailStart = (state, action) => {
  console.log("1) Reducers putProfileWorkshopDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileWorkshopDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileWorkshopDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileWorkshopDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_WORKSHOP_LIST_START:
      return getProfileWorkshopListStart(state, action);
    case GET_PROFILE_WORKSHOP_LIST_FAIL:
      return getProfileWorkshopListFail(state, action);
    case GET_PROFILE_WORKSHOP_LIST_SUCCESS:
      return getProfileWorkshopListSuccess(state, action);
    case GET_PROFILE_WORKSHOP_DETAIL_START:
      return getProfileWorkshopDetailStart(state, action);
    case GET_PROFILE_WORKSHOP_DETAIL_FAIL:
      return getProfileWorkshopDetailFail(state, action);
    case GET_PROFILE_WORKSHOP_DETAIL_SUCCESS:
      return getProfileWorkshopDetailSuccess(state, action);
    case PUT_PROFILE_WORKSHOP_DETAIL_START:
      return putProfileWorkshopDetailStart(state, action);
    case PUT_PROFILE_WORKSHOP_DETAIL_FAIL:
      return putProfileWorkshopDetailFail(state, action);
    case PUT_PROFILE_WORKSHOP_DETAIL_SUCCESS:
      return putProfileWorkshopDetailSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;