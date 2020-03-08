import axios from "axios";
import {
  GET_PROFILE_SURVEY_LIST_START,
  GET_PROFILE_SURVEY_LIST_SUCCESS,
  GET_PROFILE_SURVEY_LIST_FAIL,
  GET_PROFILE_SURVEY_DETAIL_START,
  GET_PROFILE_SURVEY_DETAIL_FAIL,
  GET_PROFILE_SURVEY_DETAIL_SUCCESS,
  PUT_PROFILE_SURVEY_DETAIL_START,
  PUT_PROFILE_SURVEY_DETAIL_FAIL,
  PUT_PROFILE_SURVEY_DETAIL_SUCCESS,
} from "./actionTypes";
import {
  profileAccountUserSurveyListURL,
  profileAccountUserSurveyDetailURL,
  profileAccountUserSurveyUpdateURL
} from "../../constants"

const getProfileSurveyListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_SURVEY_LIST_START
  };
};

const getProfileSurveyListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_SURVEY_LIST_SUCCESS ,
    data
  };
};

const getProfileSurveyListFail = error => {
  return {
    type: GET_PROFILE_SURVEY_LIST_FAIL,
    error: error
  };
};

export const getProfileSurveyList = (token, username) => {
    return dispatch => {
      console.log(" getProfileSurveyList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileAccountUserSurveyListURL(username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileSurveyListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileSurveyListFail(err));
        })
    }
}

const getProfileSurveyDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_SURVEY_DETAIL_START
  };
};

const getProfileSurveyDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_SURVEY_DETAIL_SUCCESS ,
    data
  };
};

const getProfileSurveyDetailFail = error => {
  return {
    type: GET_PROFILE_SURVEY_DETAIL_FAIL,
    error: error
  };
};

export const getProfileSurveyDetail = (token, surveyID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileAccountUserSurveyDetailURL(username, surveyID))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileSurveyDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileSurveyDetailFail(err));
        })
    }
}

const putProfileSurveyDetailStart = () => {
  console.log("1) Actions putProfileSurveyDetailStart")
  return {
    type: PUT_PROFILE_SURVEY_DETAIL_START
  };
};

const putProfileSurveyDetailSuccess = data => {
  console.log("2) Actions putProfileSurveyDetailSuccess")
  return {
    type: PUT_PROFILE_SURVEY_DETAIL_FAIL,
    data
  };
};

const putProfileSurveyDetailFail = error => {
  return {
    type: PUT_PROFILE_SURVEY_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileSurveyDetail = (token, surveyID, username, data) => {
    return dispatch => {
      console.log(" putProfileSurveyDetail ")
      console.log(" putProfileSurveyDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          "Content-Type": "application/json",
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(profileAccountUserSurveyUpdateURL(username, surveyID), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileSurveyDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileSurveyDetailFail(err));
        })
    }
}