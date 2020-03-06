import {
  GET_INQUIRY_LIST_START,
  GET_INQUIRIES_LIST_FAIL,
  GET_INQUIRIES_LIST_SUCCESS,
  GET_INQUIRY_DETAIL_START,
  GET_INQUIRY_DETAIL_FAIL,
  GET_INQUIRY_DETAIL_SUCCESS,
  CREATE_INQUIRY_START,
  CREATE_INQUIRY_FAIL,
  CREATE_INQUIRY_SUCCESS
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  inquiries: [],
  currentInquiry: {},
  error: null,
  loading: false
};

const getInquiryListStart = (state, action) => {
  console.log("1) Reducers getInquiryListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInquiryListSuccess = (state, action) => {
  console.log("2) Reducers getInquiryListSuccess")
  return updateObject(state, {
    inquiries: action.inquiries,
    error: null,
    loading: false
  });
};

const getInquiryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getInquiryDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getInquiryDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentInquiry: action.inquiry,
    error: null,
    loading: false
  });
};

const getInquiryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createInquiryStart = (state, action) => {
  console.log("1) Reducers createInquiryStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createInquirySuccess = (state, action) => {
  console.log("2) Reducers createInquirySuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createInquiryFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INQUIRY_LIST_START:
      return getInquiryListStart(state, action);
    case GET_INQUIRIES_LIST_SUCCESS:
      return getInquiryListSuccess(state, action);
    case GET_INQUIRIES_LIST_FAIL:
      return getInquiryListFail(state, action);
    case GET_INQUIRY_DETAIL_START:
      return getInquiryDetailStart(state, action);
    case GET_INQUIRY_DETAIL_SUCCESS:
      return getInquiryDetailSuccess(state, action);
    case GET_INQUIRY_DETAIL_FAIL:
      return getInquiryDetailFail(state, action);
    case CREATE_INQUIRY_START:
      return createInquiryStart(state, action);
    case CREATE_INQUIRY_SUCCESS:
      return createInquirySuccess(state, action);
    case CREATE_INQUIRY_FAIL:
      return createInquiryFail(state, action);
    default:
      return state;
  }
};

export default reducer;
