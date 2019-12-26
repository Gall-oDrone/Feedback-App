import {
  CREATE_MEETING_START,
  CREATE_MEETING_FAIL,
  CREATE_MEETING_SUCCESS,
  GET_MEETING_LIST_START,
  GET_MEETINGS_LIST_FAIL,
  GET_MEETINGS_LIST_SUCCESS,
  GET_MEETING_DETAIL_START,
  GET_MEETING_DETAIL_FAIL,
  GET_MEETING_DETAIL_SUCCESS,
  PUT_MEETING_START,
  PUT_MEETING_FAIL,
  PUT_MEETING_SUCCESS
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  commentData: null,
  error: null,
  loading: false
};

const getMeetingListStart = (state, action) => {
  console.log("1) Reducers getMeetingListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getMeetingListSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    commentData: action.data,
    error: null,
    loading: false
  });
};

const getMeetingListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getMeetingDetailStart = (state, action) => {
  return updateObject(state, {
    commentData: action,
    error: null,
    loading: true
  });
};

const getMeetingDetailSuccess = (state, action) => {
  return updateObject(state, {
    // currentArticle: action.article,
    comments: action,
    error: null,
    loading: false
  });
};

const getMeetingDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createMeetingStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
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

const putMeetingSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    commentData: action.data,
    error: null,
    loading: false
  });
};

const putMeetingFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEETING_LIST_START:
      return getMeetingListStart(state, action);
    case GET_MEETINGS_LIST_SUCCESS:
      return getMeetingListSuccess(state, action);
    case GET_MEETINGS_LIST_FAIL:
      return getMeetingListFail(state, action);
    case GET_MEETING_DETAIL_START:
      return getMeetingDetailStart(state, action);
    case GET_MEETING_DETAIL_SUCCESS:
      return getMeetingDetailSuccess(state, action);
    case GET_MEETING_DETAIL_FAIL:
      return getMeetingDetailFail(state, action);
    case CREATE_COMMENT_START:
      return createMeetingStart(state, action);
    case CREATE_COMMENT_SUCCESS:
      return createMeetingSuccess(state, action);
    case CREATE_COMMENT_FAIL:
      return createMeetingFail(state, action);
    default:
      return state;
  }
};

export default reducer;