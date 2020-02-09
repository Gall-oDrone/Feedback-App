import {
  CREATE_MEETING_REVIEW_DETAIL_START,
  CREATE_MEETING_REVIEW_DETAIL_SUCCESS,
  CREATE_MEETING_REVIEW_DETAIL_FAIL
  
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  error: null
};

const createMeetingReviewStart = (state, action) => {
  console.log("1) Reducers createMeetingReviewStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createMeetingReviewSuccess = (state, action) => {
  console.log("2) Reducers createMeetingReviewSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createMeetingReviewFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEETING_REVIEW_DETAIL_START:
      return createMeetingReviewStart(state, action);
    case CREATE_MEETING_REVIEW_DETAIL_SUCCESS:
      return createMeetingReviewSuccess(state, action);
    case CREATE_MEETING_REVIEW_DETAIL_FAIL:
      return createMeetingReviewFail(state, action);
    default:
      return state;
  }
};

export default reducer;