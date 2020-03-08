import axios from "axios";
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
} from "./actionTypes";
import {
  inquiryListURL,
  inquiryDetailURL,
  inquiryCreateURL,
  inquiryURL
} from "../../constants"

const getProfileInquiryListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_INQUIRY_LIST_START
  };
};

const getProfileInquiryListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_INQUIRY_LIST_SUCCESS ,
    data
  };
};

const getProfileInquiryListFail = error => {
  return {
    type: GET_PROFILE_INQUIRY_LIST_FAIL,
    error: error
  };
};

export const getProfileInquiryList = (token, username) => {
    return dispatch => {
      console.log(" getProfileInquiryList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(inquiryListURL(usernme))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileInquiryListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileInquiryListFail(err));
        })
    }
}

const getProfileInquiryDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_INQUIRY_DETAIL_START
  };
};

const getProfileInquiryDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_INQUIRY_DETAIL_SUCCESS ,
    data
  };
};

const getProfileInquiryDetailFail = error => {
  return {
    type: GET_PROFILE_INQUIRY_DETAIL_FAIL,
    error: error
  };
};

export const getProfileInquiryDetail = (token, inquiryID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(inquiryDetailURL(notificationID, username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileInquiryDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileInquiryDetailFail(err));
        })
    }
}

const putProfileInquiryDetailStart = () => {
  console.log("1) Actions putProfileInquiryDetailStart")
  return {
    type: PUT_PROFILE_INQUIRY_DETAIL_START
  };
};

const putProfileInquiryDetailSuccess = data => {
  console.log("2) Actions putProfileInquiryDetailSuccess")
  return {
    type: PUT_PROFILE_INQUIRY_DETAIL_FAIL,
    data
  };
};

const putProfileInquiryDetailFail = error => {
  return {
    type: PUT_PROFILE_INQUIRY_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileInquiryDetail = (token, inquiryID, username, data) => {
    return dispatch => {
      console.log(" putProfileInquiryDetail ")
      console.log(" putProfileInquiryDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          "Content-Type": "application/json",
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(inquiryDetailURL(notificationID, username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileInquiryDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileInquiryDetailFail(err));
        })
    }
}