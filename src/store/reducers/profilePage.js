import {
  GET_PROFILE_PAGE_START,
  GET_PROFILE_PAGE_FAIL,
  GET_PROFILE_PAGE_SUCCESS,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false
};

const getProfilePageStart = (state, action) => {
  console.log("1) Reducers getProfilePageStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfilePageSuccess = (state, action) => {
  console.log("2) Reducers getProfilePageSuccess")
  console.log("3) Reducers getProfilePageSuccess action: "+JSON.stringify(action))
  return updateObject(state, {
    ProfilePage: action.data,
    error: null,
    loading: false
  });
};

const getProfilePageFail = (state, action) => {
  console.log("4) Reducers getProfilePageFail")
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_PAGE_START:
      return getProfilePageStart(state, action);
    case GET_PROFILE_PAGE_SUCCESS:
      return getProfilePageSuccess(state, action);
    case GET_PROFILE_PAGE_FAIL:
      return getProfilePageFail(state, action);
    default:
      return state;
  }
};

export default reducer;