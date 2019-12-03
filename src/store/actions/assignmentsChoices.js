import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getASNTChoiceStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_CHOICES_START
  };
};

export const getASNTChoiceSuccess = choices => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_CHOICES_SUCCESS,
    choices
  };
};

export const getASNTChoiceFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_CHOICES_FAIL,
    error: error
  };
};

export const getASNTSChoices = token => {
    return dispatch => {
        dispatch(getASNTChoiceStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get("http://127.0.0.1:8000/assignmentsChoices/")
        .then(res => {
          console.log("1) actions getASNTSChoices: " )
            const choices = res.data;
            console.log("2) actions choices: " + JSON.stringify(choices))
            dispatch(getASNTChoiceSuccess(choices));
        })
        .catch(err => {
            dispatch(getASNTChoiceFail());
        })
    }
}