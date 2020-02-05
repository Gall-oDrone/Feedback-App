import {
  GET_RATING_START,
  GET_RATING_FAIL,
  GET_RATING_SUCCESS,
  CREATE_RATING_START,
  CREATE_RATING_FAIL,
  CREATE_RATING_SUCCESS
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  avgRating: null,
  ratingCount: null
};

const createRatingStart = (state, action) => {
  console.log("1) Reducers createRatingStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createRatingSuccess = (state, action) => {
  console.log("2) Reducers createRatingSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createRatingFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const ratingStart = (state, action) => {
  console.log("Reducers GET_RATING START state: " + JSON.stringify(state))
  console.log("Reducers GET_RATING START action: " + JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const ratingSuccess = (state, action) => {
  console.log("GET_RATING SUCCESS")
  console.log(action)
  return updateObject(state, {
    avgRating: action.avg_rating,
    ratingCount: action.rating_count,
    error: null,
    loading: false
  });
};

const ratingFail = (state, action) => {
  console.log("GET_RATING FAIL")
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RATING_START:
      return ratingStart(state, action);
    case GET_RATING_SUCCESS:
      return ratingSuccess(state, action);
    case GET_RATING_FAIL:
      return ratingFail(state, action);
    case CREATE_RATING_START:
      return createRatingStart(state, action);
    case CREATE_RATING_SUCCESS:
      return createRatingSuccess(state, action);
    case CREATE_RATING_FAIL:
      return createRatingFail(state, action);
    default:
      return state;
  }
};

export default reducer;