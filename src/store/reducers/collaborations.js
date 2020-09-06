import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  articles: [],
  currentProject: {},
  error: null,
  loading: false
};

const getProjectListStart = (state, action) => {
  console.log("1) Reducers getProjectListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProjectListSuccess = (state, action) => {
  console.log("2) Reducers getProjectListSuccess")
  return updateObject(state, {
    articles: action.articles,
    error: null,
    loading: false
  });
};

const getProjectListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProjectDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProjectDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentProject: action.article,
    error: null,
    loading: false
  });
};

const getProjectDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createProjectStart = (state, action) => {
  console.log("1) Reducers createProjectStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createProjectSuccess = (state, action) => {
  console.log("2) Reducers createProjectSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createProjectFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROJECT_LIST_START:
      return getProjectListStart(state, action);
    case actionTypes.GET_PROJECTS_LIST_SUCCESS:
      return getProjectListSuccess(state, action);
    case actionTypes.GET_PROJECTS_LIST_FAIL:
      return getProjectListFail(state, action);
    case actionTypes.GET_PROJECT_DETAIL_START:
      return getProjectDetailStart(state, action);
    case actionTypes.GET_PROJECT_DETAIL_SUCCESS:
      return getProjectDetailSuccess(state, action);
    case actionTypes.GET_PROJECT_DETAIL_FAIL:
      return getProjectDetailFail(state, action);
    case actionTypes.CREATE_PROJECT_START:
      return createProjectStart(state, action);
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return createProjectSuccess(state, action);
    case actionTypes.CREATE_PROJECT_FAIL:
      return createProjectFail(state, action);
    default:
      return state;
  }
};

export default reducer;
