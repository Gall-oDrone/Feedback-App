import axios from "axios";
import {
  GET_SURVEY_CHOICES_START,
  GET_SURVEYS_CHOICES_FAIL,
  GET_SURVEYS_CHOICES_SUCCESS
} from "./actionTypes";

export const getSurveyChoiceStart = () => {
  return {
    type: GET_SURVEY_CHOICES_START
  };
};

export const getSurveyChoiceSuccess = choices => {
  return {
    type: GET_SURVEYS_CHOICES_SUCCESS,
    choices
  };
};

export const getSurveyChoiceFail = error => {
  return {
    type: GET_SURVEYS_CHOICES_FAIL,
    error: error
  };
};

export const getSurveySChoices = token => {
    return dispatch => {
        dispatch(getSurveyChoiceStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get("http://127.0.0.1:8000/assignmentsChoices/")
        .then(res => {
          console.log("1) actions getSurveySChoices: " )
            const choices = res.data;
            console.log("2) actions choices: " + JSON.stringify(choices))
            dispatch(getSurveyChoiceSuccess(choices));
        })
        .catch(err => {
            dispatch(getSurveyChoiceFail());
        })
    }
}