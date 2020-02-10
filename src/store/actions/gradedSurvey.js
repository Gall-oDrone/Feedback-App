import axios from "axios";
import {
  GET_GRADED_SURVEY_LIST_START,
  GET_GRADED_SURVEYS_LIST_FAIL,
  GET_GRADED_SURVEYS_LIST_SUCCESS
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
      .get(`http://127.0.0.1:8000/surveyApi/graded-surveys/?username=${username}`)
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
    //   dispatch(createSurveyStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/surveyApi/graded-surveys/create/`, survey)
      .then(res => {
        console.log("success");
        //   dispatch(createSurveySuccess());
      })
      .catch(err => {
        //   dispatch(createSurveyFail());
      });
  };
};