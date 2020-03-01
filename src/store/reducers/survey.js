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
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  surveys: [],
  currentSurvey: {},
  error: null,
  loading: false
};

const getSurveyListStart = (state, action) => {
  console.log("1) Reducers getSurveyListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSurveyListSuccess = (state, action) => {
  console.log("2) Reducers getSurveyListSuccess")
  return updateObject(state, {
    surveys: action.surveys,
    error: null,
    loading: false
  });
};

const getSurveyListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getSurveyDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSurveyDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentSurvey: action.survey,
    error: null,
    loading: false
  });
};

const getSurveyDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createSurveyStart = (state, action) => {
  console.log("1) Reducers createSurveyStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createSurveySuccess = (state, action) => {
  console.log("2) Reducers createSurveySuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createSurveyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SURVEY_LIST_START:
      return getSurveyListStart(state, action);
    case GET_SURVEYS_LIST_SUCCESS:
      return getSurveyListSuccess(state, action);
    case GET_SURVEYS_LIST_FAIL:
      return getSurveyListFail(state, action);
    case GET_SURVEY_DETAIL_START:
      return getSurveyDetailStart(state, action);
    case GET_SURVEY_DETAIL_SUCCESS:
      return getSurveyDetailSuccess(state, action);
    case GET_SURVEY_DETAIL_FAIL:
      return getSurveyDetailFail(state, action);
    case CREATE_SURVEY_START:
      return createSurveyStart(state, action);
    case CREATE_SURVEY_SUCCESS:
      return createSurveySuccess(state, action);
    case CREATE_SURVEY_FAIL:
      return createSurveyFail(state, action);
    default:
      return state;
  }
};

export default reducer;
