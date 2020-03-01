import axios from "axios";
import {
  GET_GRADED_SURVEY_LIST_START,
  GET_GRADED_SURVEYS_LIST_FAIL,
  GET_GRADED_SURVEYS_LIST_SUCCESS,
  GET_GRADED_SURVEY_DETAIL_START,
  GET_GRADED_SURVEYS_DETAIL_SUCCESS,
  GET_GRADED_SURVEYS_DETAIL_FAIL,
} from "./actionTypes";

const getGradedSurveyListStart = () => {
  return {
    type: GET_GRADED_SURVEY_LIST_START
  };
};

const getGradedSurveyListSuccess = surveys => {
  return {
    type: GET_GRADED_SURVEYS_LIST_SUCCESS,
    surveys
  };
};

const getGradedSurveyListFail = error => {
  return {
    type: GET_GRADED_SURVEYS_LIST_FAIL,
    error: error
  };
};

export const getGradedSurveyS = (username, token) => {
  return dispatch => {
    dispatch(getGradedSurveyListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/graded-survey/?username=${username}`)
      .then(res => {
        const surveys = res.data;
        dispatch(getGradedSurveyListSuccess(surveys));
      })
      .catch(err => {
        dispatch(getGradedSurveyListFail(err));
      });
  };
};

export const createGradedSurvey = (token, survey) => {
  return dispatch => {
    console.log("createGradedSurvey", JSON.stringify(survey))
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/graded-survey/create/`, survey)
      .then(res => {
        console.log("success");
        //   dispatch(createSurveySuccess());
      })
      .catch(err => {
        //   dispatch(createSurveyFail());
      });
  };
};

const getGradedSurveyDetailStart = () => {
  return {
    type: GET_GRADED_SURVEY_DETAIL_START
  };
};

const getGradedSurveyDetailSuccess = gsurvey => {
  return {
    type: GET_GRADED_SURVEYS_DETAIL_SUCCESS,
    gsurvey
  };
};

const getGradedSurveyDetailFail = error => {
  return {
    type: GET_GRADED_SURVEYS_DETAIL_FAIL,
    error: error
  };
};

export const getGradedSurveyDetail = (token, articleId) => {
  return dispatch => {
    dispatch(getGradedSurveyDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/graded-survey/${articleId}/`)
      .then(res => {
        const gsurvey = res.data;
        dispatch(getGradedSurveyDetailSuccess(gsurvey));
      })
      .catch(err => {
        dispatch(getGradedSurveyDetailFail(err));
      });
  };
};