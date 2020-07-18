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
import {
  surveyListURL,
  surveyDetailURL,
  surveyCreateURL
} from "../../constants"

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

export const getSurvey = () => {
    return dispatch => {
      console.log(" getSurveyS: ")
        dispatch(getSurveyListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${token}`
        }
        axios.get(surveyListURL)
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
        axios.get(surveyDetailURL(id))
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

const createSurveySuccess = () => {
  return {
    type: CREATE_SURVEY_SUCCESS,
  };
};

const createSurveyFail = error => {
  return {
    type: CREATE_SURVEY_FAIL,
    error: error
  };
};

export const createSurvey = (token, asnt) => {
  console.log("Create survey start")
    return dispatch => {
        dispatch(createSurveyStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        console.log("SOMETHING",JSON.stringify(asnt))
        axios.post(surveyCreateURL, asnt)
        .then(res => {
            
            dispatch(createSurveySuccess());
        })
        .catch(err => {
            dispatch(createSurveyFail(err));
        })
    }
}