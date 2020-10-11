import {
  GLOBAL_SEARCH_SUCCESS,
  GLOBAL_SEARCH_FAIL,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: null,
  results: null,
  error: null,
};

const searchSuccess = (state, action) => {
  console.log("Reducers GLOBAL_SEARCH SUCCESS")
  console.log(action)
  return updateObject(state, {
    results: action.data,
    error: null,
    loading: false
  });
};

const searchFail = (state, action) => {
  console.log("GLOBAL_SEARCH FAIL")
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case GLOBAL_SEARCH_FAIL:
      return searchFail(state, action);
    default:
      return state;
  }
};

export default reducer;
