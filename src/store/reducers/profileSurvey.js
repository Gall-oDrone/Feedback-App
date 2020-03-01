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
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false
};

const getProfileSurveyListStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileSurveyListSuccess = (state, action) => {
  console.log("2) Reducers getProfileSurveyListSuccess")
  return updateObject(state, {
    surveyList: action.data,
    error: null,
    loading: false
  });
};

const getProfileSurveyListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileSurveyDetailStart = (state, action) => {
  console.log("1) Reducers getProfileSurveyDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileSurveyDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileSurveyDetailSuccess")
  return updateObject(state, {
    surveyDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileSurveyDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileSurveyDetailStart = (state, action) => {
  console.log("1) Reducers putProfileSurveyDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileSurveyDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileSurveyDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileSurveyDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SURVEY_LIST_START:
      return getProfileSurveyListStart(state, action);
    case GET_PROFILE_SURVEY_LIST_FAIL:
      return getProfileSurveyListFail(state, action);
    case GET_PROFILE_SURVEY_LIST_SUCCESS:
      return getProfileSurveyListSuccess(state, action);
    case GET_PROFILE_SURVEY_DETAIL_START:
      return getProfileSurveyDetailStart(state, action);
    case GET_PROFILE_SURVEY_DETAIL_FAIL:
      return getProfileSurveyDetailFail(state, action);
    case GET_PROFILE_SURVEY_DETAIL_SUCCESS:
      return getProfileSurveyDetailSuccess(state, action);
    case PUT_PROFILE_SURVEY_DETAIL_START:
      return putProfileSurveyDetailStart(state, action);
    case PUT_PROFILE_SURVEY_DETAIL_FAIL:
      return putProfileSurveyDetailFail(state, action);
    case PUT_PROFILE_SURVEY_DETAIL_SUCCESS:
      return putProfileSurveyDetailSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;