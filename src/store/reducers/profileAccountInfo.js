import {
  GET_PROFILE_ACCOUNT_DETAIL_START,
  GET_PROFILE_ACCOUNT_DETAIL_FAIL,
  GET_PROFILE_ACCOUNT_DETAIL_SUCCESS,
  PUT_PROFILE_ACCOUNT_DETAIL_START,
  PUT_PROFILE_ACCOUNT_DETAIL_FAIL,
  PUT_PROFILE_ACCOUNT_DETAIL_SUCCESS
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false
};

const getProfileAccountStart = (state, action) => {
  console.log("1) Reducers getMeetingListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileAccountSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    ProfileAccount: action.data,
    error: null,
    loading: false
  });
};

const getProfileAccountFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileAccountDetailStart = (state, action) => {
  console.log("1) Reducers putProfileAccountDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileAccountDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileAccountDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileAccountDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_ACCOUNT_DETAIL_START:
      return getProfileAccountStart(state, action);
    case GET_PROFILE_ACCOUNT_DETAIL_FAIL:
      return getProfileAccountFail(state, action);
    case GET_PROFILE_ACCOUNT_DETAIL_SUCCESS:
      return getProfileAccountSuccess(state, action);
    case PUT_PROFILE_ACCOUNT_DETAIL_START:
      return putProfileAccountDetailStart(state, action);
    case PUT_PROFILE_ACCOUNT_DETAIL_FAIL:
      return putProfileAccountDetailFail(state, action);
    case PUT_PROFILE_ACCOUNT_DETAIL_SUCCESS:
      return putProfileAccountDetailSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;