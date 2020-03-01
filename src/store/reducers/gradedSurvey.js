import {
  GET_GRADED_SURVEY_LIST_START,
  GET_GRADED_SURVEYS_LIST_SUCCESS,
  GET_GRADED_SURVEYS_LIST_FAIL,
  GET_GRADED_SURVEY_DETAIL_START,
  GET_GRADED_SURVEYS_DETAIL_SUCCESS,
  GET_GRADED_SURVEYS_DETAIL_FAIL,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  surveys: [],
  error: null,
  loading: false
};

const getGradedSurveyListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getGradedSurveyListSuccess = (state, action) => {
  return updateObject(state, {
    surveys: action.surveys,
    error: null,
    loading: false
  });
};

const getGradedSurveyListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getGradedSurveyDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getGradedSurveyDetailSuccess = (state, action) => {
  return updateObject(state, {
    graded_survey: action.gsurvey,
    error: null,
    loading: false
  });
};

const getGradedSurveyDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADED_SURVEY_LIST_START:
      return getGradedSurveyListStart(state, action);
    case GET_GRADED_SURVEYS_LIST_SUCCESS:
      return getGradedSurveyListSuccess(state, action);
    case GET_GRADED_SURVEYS_LIST_FAIL:
      return getGradedSurveyListFail(state, action);
    case GET_GRADED_SURVEY_DETAIL_START:
      return getGradedSurveyDetailStart(state, action);
    case GET_GRADED_SURVEYS_DETAIL_SUCCESS:
      return getGradedSurveyDetailSuccess(state, action);
    case GET_GRADED_SURVEYS_DETAIL_FAIL:
      return getGradedSurveyDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;