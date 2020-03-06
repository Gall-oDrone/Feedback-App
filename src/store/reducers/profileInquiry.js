import {
  GET_PROFILE_INQUIRY_LIST_START,
  GET_PROFILE_INQUIRY_LIST_SUCCESS,
  GET_PROFILE_INQUIRY_LIST_FAIL,
  GET_PROFILE_INQUIRY_DETAIL_START,
  GET_PROFILE_INQUIRY_DETAIL_FAIL,
  GET_PROFILE_INQUIRY_DETAIL_SUCCESS,
  PUT_PROFILE_INQUIRY_DETAIL_START,
  PUT_PROFILE_INQUIRY_DETAIL_FAIL,
  PUT_PROFILE_INQUIRY_DETAIL_SUCCESS,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false
};

const getProfileInquiryListStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileInquiryListSuccess = (state, action) => {
  console.log("2) Reducers getProfileInquiryListSuccess")
  return updateObject(state, {
    inquiryList: action.data,
    error: null,
    loading: false
  });
};

const getProfileInquiryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileInquiryDetailStart = (state, action) => {
  console.log("1) Reducers getProfileInquiryDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileInquiryDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileInquiryDetailSuccess")
  return updateObject(state, {
    inquiryDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileInquiryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileInquiryDetailStart = (state, action) => {
  console.log("1) Reducers putProfileInquiryDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileInquiryDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileInquiryDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileInquiryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_INQUIRY_LIST_START:
      return getProfileInquiryListStart(state, action);
    case GET_PROFILE_INQUIRY_LIST_FAIL:
      return getProfileInquiryListFail(state, action);
    case GET_PROFILE_INQUIRY_LIST_SUCCESS:
      return getProfileInquiryListSuccess(state, action);
    case GET_PROFILE_INQUIRY_DETAIL_START:
      return getProfileInquiryDetailStart(state, action);
    case GET_PROFILE_INQUIRY_DETAIL_FAIL:
      return getProfileInquiryDetailFail(state, action);
    case GET_PROFILE_INQUIRY_DETAIL_SUCCESS:
      return getProfileInquiryDetailSuccess(state, action);
    case PUT_PROFILE_INQUIRY_DETAIL_START:
      return putProfileInquiryDetailStart(state, action);
    case PUT_PROFILE_INQUIRY_DETAIL_FAIL:
      return putProfileInquiryDetailFail(state, action);
    case PUT_PROFILE_INQUIRY_DETAIL_SUCCESS:
      return putProfileInquiryDetailSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;