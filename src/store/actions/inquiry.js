import axios from "axios";
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
} from "./actionTypes";

import {
  inquiryListURL,
  inquiryDetailURL,
  inquiryCreateURL
} from "../../constants"

const getInquiryListStart = () => {
  console.log("1) Actions getInquiryListStart")
  return {
    type: GET_INQUIRY_LIST_START
  };
};

const getInquiryListSuccess = inquiries => {
  console.log("2) Actions getInquiryListSuccess")
  return {
    type: GET_INQUIRIES_LIST_SUCCESS,
    inquiries
  };
};

const getInquiryListFail = error => {
  return {
    type: GET_INQUIRIES_LIST_FAIL,
    error: error
  };
};

export const getInquiry = token => {
    return dispatch => {
      console.log(" getInquiryS: ")
        dispatch(getInquiryListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${token}`
        }
        axios.get(inquiryListURL)
        .then(res => {
            const inquiries = res.data;
            dispatch(getInquiryListSuccess(inquiries));
        })
        .catch(err => {
            dispatch(getInquiryListFail());
        })
    }
}

const getInquiryDetailStart = () => {
  return {
    type: GET_INQUIRY_DETAIL_START
  };
};

const getInquiryDetailSuccess = inquiry => {
  return {
    type: GET_INQUIRY_DETAIL_SUCCESS,
    inquiry
  };
};

const getInquiryDetailFail = error => {
  return {
    type: GET_INQUIRY_DETAIL_FAIL,
    error: error
  };
};

export const getInquirySDetail = (token, id) => {
    return dispatch => {
        dispatch(getInquiryDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${token}`
        }
        axios.get(inquiryDetailURL(ID))
        .then(res => {
            const inquiry = res.data;
            dispatch(getInquiryDetailSuccess(inquiry));
        })
        .catch(err => {
            dispatch(getInquiryDetailFail());
        })
    }
}

const createInquiryStart = () => {
  return {
    type: CREATE_INQUIRY_START
  };
};

const createInquirySuccess = () => {
  return {
    type: CREATE_INQUIRY_SUCCESS,
  };
};

const createInquiryFail = error => {
  return {
    type: CREATE_INQUIRY_FAIL,
    error: error
  };
};

export const createInquiry = (token, asnt) => {
  console.log("Create inquiry start")
    return dispatch => {
        dispatch(createInquiryStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        console.log("SOMETHING",JSON.stringify(asnt))
        axios.post(inquiryCreateURL, asnt)
        .then(res => {
            
            dispatch(createInquirySuccess());
        })
        .catch(err => {
            dispatch(createInquiryFail(err));
        })
    }
}