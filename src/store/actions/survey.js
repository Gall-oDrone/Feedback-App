import axios from "axios";
import {
  GET_SURVEY_LIST_START,
  GET_SURVEYS_LIST_FAIL,
  GET_SURVEYS_LIST_SUCCESS,
  GET_SURVEY_DETAIL_START,
  GET_SURVEY_DETAIL_FAIL,
  GET_SURVEY_DETAIL_SUCCESS,
  CREATE_SURVEY_START,
  CREATE_SURVEY_FAIL,
  CREATE_SURVEY_SUCCESS
} from "./actionTypes";

const getSurveyListStart = () => {
  console.log("1) Actions getSurveyListStart")
  return {
    type: GET_SURVEY_LIST_START
  };
};

const getSurveyListSuccess = surveys => {
  console.log("2) Actions getSurveyListSuccess")
  return {
    type: GET_SURVEYS_LIST_SUCCESS,
    surveys
  };
};

const getSurveyListFail = error => {
  return {
    type: GET_SURVEYS_LIST_FAIL,
    error: error
  };
};

export const getSurveyS = token => {
    return dispatch => {
      console.log(" getSurveyS: ")
        dispatch(getSurveyListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get("http://127.0.0.1:8000/surveys/")
        .then(res => {
            const surveys = res.data;
            dispatch(getSurveyListSuccess(surveys));
        })
        .catch(err => {
            dispatch(getSurveyListFail());
        })
    }
}

const getSurveyDetailStart = () => {
  return {
    type: GET_SURVEY_DETAIL_START
  };
};

const getSurveyDetailSuccess = survey => {
  return {
    type: GET_SURVEY_DETAIL_SUCCESS,
    survey
  };
};

const getSurveyDetailFail = error => {
  return {
    type: GET_SURVEY_DETAIL_FAIL,
    error: error
  };
};

export const getSurveySDetail = (token, id) => {
    return dispatch => {
        dispatch(getSurveyDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/surveyApi/surveys/${id}/`)
        .then(res => {
            const survey = res.data;
            dispatch(getSurveyDetailSuccess(survey));
        })
        .catch(err => {
            dispatch(getSurveyDetailFail());
        })
    }
}

const createSurveyStart = () => {
  return {
    type: CREATE_SURVEY_START
  };
};

const createSurveySuccess = survey => {
  return {
    type: CREATE_SURVEY_SUCCESS,
    survey
  };
};

const createSurveyFail = error => {
  return {
    type: CREATE_SURVEY_FAIL,
    error: error
  };
};

export const createSurvey = (token, asnt) => {
    return dispatch => {
        dispatch(createSurveyStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(`http://127.0.0.1:8000/surveyApi/surveys/`, asnt)
        .then(res => {
            
            dispatch(createSurveySuccess());
        })
        .catch(err => {
            dispatch(createSurveyFail());
        })
    }
}