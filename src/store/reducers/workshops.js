import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  workshops: [],
  currentWorkshop: {},
  error: null,
  loading: false
};

const getWorkshopListStart = (state, action) => {
  console.log("1) Reducers getWorkshopListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWorkshopListSuccess = (state, action) => {
  console.log("2) Reducers getWorkshopListSuccess")
  return updateObject(state, {
    workshops: action.workshops,
    error: null,
    loading: false
  });
};

const getWorkshopListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getWorkshopDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWorkshopDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentWorkshop: action.workshop,
    error: null,
    loading: false
  });
};

const getWorkshopDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createWorkshopStart = (state, action) => {
  console.log("1) Reducers createWorkshopStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createWorkshopSuccess = (state, action) => {
  console.log("2) Reducers createWorkshopSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createWorkshopFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getWorkshopContentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getWorkshopContentSuccess = (state, action) => {
  return updateObject(state, {
    currentWorkshop: action.workshop,
    error: null,
    loading: false
  });
};

const getWorkshopContentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLE_LIST_START:
      return getWorkshopListStart(state, action);
    case actionTypes.GET_ARTICLES_LIST_SUCCESS:
      return getWorkshopListSuccess(state, action);
    case actionTypes.GET_ARTICLES_LIST_FAIL:
      return getWorkshopListFail(state, action);
    case actionTypes.GET_ARTICLE_DETAIL_START:
      return getWorkshopDetailStart(state, action);
    case actionTypes.GET_ARTICLE_DETAIL_SUCCESS:
      return getWorkshopDetailSuccess(state, action);
    case actionTypes.GET_ARTICLE_DETAIL_FAIL:
      return getWorkshopDetailFail(state, action);
    case actionTypes.CREATE_ARTICLE_START:
      return createWorkshopStart(state, action);
    case actionTypes.CREATE_ARTICLE_SUCCESS:
      return createWorkshopSuccess(state, action);
    case actionTypes.CREATE_ARTICLE_FAIL:
      return createWorkshopFail(state, action);
    case actionTypes.GET_WORKSHOP_CONTENT_START:
      return getWorkshopContentStart(state, action);
    case actionTypes.GET_WORKSHOP_CONTENT_SUCCESS:
      return getWorkshopContentSuccess(state, action);
    case actionTypes.GET_WORKSHOP_CONTENT_FAIL:
      return getWorkshopContentFail(state, action);
    default:
      return state;
  }
};

export default reducer;
