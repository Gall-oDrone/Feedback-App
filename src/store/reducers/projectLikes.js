import {
  GET_PROJECT_LIKES_START,
  GET_PROJECT_LIKES_FAIL,
  GET_PROJECT_LIKES_SUCCESS,
  PROJECT_LIKE_START,
  PROJECT_LIKE_SUCCESS,
  PROJECT_LIKE_FAIL,
  GET_PROJECT_LIKE_DETAIL_START,
  GET_PROJECT_LIKE_DETAIL_SUCCESS,
  GET_PROJECT_LIKE_DETAIL_FAIL
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  like_counter: null,
  liked: null,
  error: null,
  loading: false
};

const likeStart = (state, action) => {
  console.log("Reducers PROJECT_LIKE START state: " + JSON.stringify(state))
  console.log("Reducers PROJECT_LIKE START action: " + JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const likeSuccess = (state, action) => {
  console.log("Reducers PROJECT_LIKE SUCCESS")
  console.log(action)
  return updateObject(state, {
    like_counter: action.data,
    error: null,
    loading: false
  });
};

const likeFail = (state, action) => {
  console.log("PROJECT_LIKE FAIL")
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const likeDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const likeDetailSuccess = (state, action) => {
  console.log("PROJECT_LIKE Detail SUCCESS")
  console.log(action)
  return updateObject(state, {
    liked: action.data,
    error: null,
    loading: false
  });
};

const likeDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_LIKE_START:
      return likeStart(state, action);
    case PROJECT_LIKE_SUCCESS:
      return likeSuccess(state, action);
    case PROJECT_LIKE_FAIL:
      return likeFail(state, action);
    case GET_PROJECT_LIKE_DETAIL_START:
      return likeDetailStart(state, action);
    case GET_PROJECT_LIKE_DETAIL_SUCCESS:
      return likeDetailSuccess(state, action);
    case GET_PROJECT_LIKE_DETAIL_FAIL:
      return likeDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
