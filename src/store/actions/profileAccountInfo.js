import axios from "axios";
import {
  GET_PROFILE_ACCOUNT_DETAIL_START,
  GET_PROFILE_ACCOUNT_DETAIL_FAIL,
  GET_PROFILE_ACCOUNT_DETAIL_SUCCESS,
  PUT_PROFILE_ACCOUNT_DETAIL_START,
  PUT_PROFILE_ACCOUNT_DETAIL_FAIL,
  PUT_PROFILE_ACCOUNT_DETAIL_SUCCESS
} from "./actionTypes";
import {
  profileAccountUserInfoURL,
  profileAccountUserInfoUpdateURL,
  profileAccountUserSurveyListURL,
  profileAccountUserSurveyDetailURL,
  profileAccountUserSurveyUpdateURL,
  profileArticleListURL,
  profileArticleDetailURL,
  profileAccountInfoURL
} from "../../constants"

const getProfileAccountListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    // type: GET_PROFILE_ARTICLE_LIST_START
  };
};

const getProfileAccountListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    // type: GET_PROFILE_ARTICLES_LIST_SUCCESS ,
    data
  };
};

const getProfileAccountListFail = error => {
  return {
    // type: GET_PROFILE_ARTICLES_LIST_FAIL,
    error: error
  };
};

export const getProfileAccountList = (token, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileArticleListURL(username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileAccountListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileAccountListFail(err));
        })
    }
}

const getProfileAccountDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_ACCOUNT_DETAIL_START
  };
};

const getProfileAccountDetailSuccess = data => {
  console.log("2) Actions getProfileAccountDetailSuccess")
  return {
    type: GET_PROFILE_ACCOUNT_DETAIL_SUCCESS,
    data
  };
};

const getProfileAccountDetailFail = error => {
  return {
    type: GET_PROFILE_ACCOUNT_DETAIL_FAIL,
    error: error
  };
};

export const getProfileAccountDetail = (token, userId) => {
    return dispatch => {
      console.log(" getProfileAccountDetail ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileAccountInfoURL(userId))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileAccountDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileAccountDetailFail(err));
        })
    }
}

const putProfileAccountDetailStart = () => {
  console.log("1) Actions putProfileAccountDetailStart")
  return {
    type: PUT_PROFILE_ACCOUNT_DETAIL_START
  };
};

const putProfileAccountDetailSuccess = data => {
  console.log("2) Actions putProfileAccountDetailSuccess")
  return {
    type: PUT_PROFILE_ACCOUNT_DETAIL_SUCCESS,
    data
  };
};

const putProfileAccountDetailFail = error => {
  return {
    type: PUT_PROFILE_ACCOUNT_DETAIL_FAIL,
    error: error
  };
};

export const putProfileAccountDetail = (token, articleID, username, data) => {
    return dispatch => {
      console.log(" putProfileAccountDetail ")
      console.log(" putProfileAccountDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(profileArticleDetailURL(articleID, username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileAccountDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileAccountDetailFail(err));
        })
    }
}