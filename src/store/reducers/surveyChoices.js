import {
  GET_SURVEY_CHOICES_START,
  GET_SURVEYS_CHOICES_FAIL,
  GET_SURVEYS_CHOICES_SUCCESS
} from "./actionTypes";
import { updateObject } from "../utility";

const initialState = {
  choices: [],
  currentChocies: {},
  error: null,
  loading: false
};

const getSurveyChoiceStart = (state, action) => {
  console.log("1) Reducers getSurveyChoiceStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSurveyChoiceSuccess = (state, action) => {
  console.log("2) Reducers getSurveyChoiceSuccess")
  console.log("3) Reducers getSurveyChoiceSuccess state: " + JSON.stringify(state))
  return updateObject(state, {
    choices: action.choices,
    error: null,
    loading: false
  });
};

const getSurveyChoiceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  console.log("4) Reducers action: " + JSON.stringify(action))
  console.log("5) Reducers action state: " + JSON.stringify(state))
  switch (action.type) {
    case GET_SURVEY_CHOICES_START:
        console.log("6) GET_SURVEY_CHOICES_START: ")
      return getSurveyChoiceStart(state, action);
    case GET_SURVEYS_CHOICES_SUCCESS:
        console.log("7) GET_SURVEYS_CHOICES_SUCCESS: ")
      return getSurveyChoiceSuccess(state, action);
    case GET_SURVEYS_CHOICES_FAIL:
      return getSurveyChoiceFail(state, action);
    default:
      return state;
  }
};

export default reducer;

