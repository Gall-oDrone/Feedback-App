import {
  CREATE_MEETING_START,
  CREATE_MEETING_FAIL,
  CREATE_MEETING_SUCCESS,
  GET_MEETING_LIST_START,
  GET_MEETINGS_LIST_FAIL,
  GET_MEETINGS_LIST_SUCCESS,
  GET_RECEVIED_MEETING_LIST_START,
  GET_RECEVIED_MEETINGS_LIST_SUCCESS,
  GET_RECEVIED_MEETINGS_LIST_FAIL,
  GET_MEETING_DETAIL_START,
  GET_MEETING_DETAIL_FAIL,
  GET_MEETING_DETAIL_SUCCESS,
  GET_BOOKED_MEETING_LIST_START,
  GET_BOOKED_MEETINGS_LIST_SUCCESS,
  GET_BOOKED_MEETINGS_LIST_FAIL,
  PUT_MEETING_START,
  PUT_MEETING_FAIL,
  PUT_MEETING_SUCCESS,
  PUT_MEETING_DETAIL_START,
  PUT_MEETING_DETAIL_SUCCESS,
  PUT_MEETING_DETAIL_FAIL
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false
};

const getUserMeetingListStart = (state, action) => {
  console.log("1) Reducers getMeetingListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserMeetingListSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    UserMeetingList: action.meetingList,
    error: null,
    loading: false
  });
};

const getUserMeetingListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUserReceivedMeetingListStart = (state, action) => {
  console.log("1) Reducers getMeetingListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserReceivedMeetingListSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    ReceivedMeetingList: action.meetingList,
    error: null,
    loading: false
  });
};

const getUserReceivedMeetingListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUserBookedMeetingListStart = (state, action) => {
  console.log("1) Reducers getMeetingListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserBookedMeetingListSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    BookedMeetingList: action.meetingList,
    error: null,
    loading: false
  });
};

const getUserBookedMeetingListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getMeetingDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getMeetingDetailSuccess = (state, action) => {
  console.log("2) Reducers getMeetingDetailSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    // currentArticle: action.article,
    UserMeetingDetails: action.data,
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

const putMeetingDetailStart = (state, action) => {
  console.log("1) Reducers putMeetingDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putMeetingDetailSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    putData: action.data,
    error: null,
    loading: false
  });
};

const putMeetingDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEETING_LIST_START:
      return getUserMeetingListStart(state, action);
    case GET_MEETINGS_LIST_SUCCESS:
      return getUserMeetingListSuccess(state, action);
    case GET_MEETINGS_LIST_FAIL:
      return getUserReceivedMeetingListFail(state, action);
    case GET_RECEVIED_MEETING_LIST_START:
      return getUserReceivedMeetingListStart(state, action);
    case GET_RECEVIED_MEETINGS_LIST_SUCCESS:
      return getUserReceivedMeetingListSuccess(state, action);
    case GET_RECEVIED_MEETINGS_LIST_FAIL:
      return getUserMeetingListFail(state, action);
    case GET_BOOKED_MEETING_LIST_START:
      return getUserBookedMeetingListStart(state, action);
    case GET_BOOKED_MEETINGS_LIST_SUCCESS:
      return getUserBookedMeetingListSuccess(state, action);
    case GET_BOOKED_MEETINGS_LIST_FAIL:
      return getUserBookedMeetingListFail(state, action);
    case GET_MEETING_DETAIL_START:
      return getMeetingDetailStart(state, action);
    case GET_MEETING_DETAIL_SUCCESS:
      return getMeetingDetailSuccess(state, action);
    case GET_MEETING_DETAIL_FAIL:
      return getMeetingDetailFail(state, action);
    case PUT_MEETING_DETAIL_SUCCESS:
      return putMeetingDetailSuccess(state, action);
    case PUT_MEETING_DETAIL_FAIL:
      return putMeetingDetailFail(state, action);
    case PUT_MEETING_DETAIL_START:
      return putMeetingDetailStart(state, action);
    case CREATE_MEETING_START:
      return createMeetingStart(state, action);
    case CREATE_MEETING_SUCCESS:
      return createMeetingSuccess(state, action);
    case CREATE_MEETING_FAIL:
      return createMeetingFail(state, action);
    default:
      return state;
  }
};

export default reducer;