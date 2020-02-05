import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  articles: [],
  currentArticle: {},
  error: null,
  loading: false
};

const getArticleListStart = (state, action) => {
  console.log("1) Reducers getArticleListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getArticleListSuccess = (state, action) => {
  console.log("2) Reducers getArticleListSuccess")
  return updateObject(state, {
    articles: action.articles,
    error: null,
    loading: false
  });
};

const getArticleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getArticleDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getArticleDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentArticle: action.article,
    error: null,
    loading: false
  });
};

const getArticleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createArticleStart = (state, action) => {
  console.log("1) Reducers createArticleStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createArticleSuccess = (state, action) => {
  console.log("2) Reducers createArticleSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createArticleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLE_LIST_START:
      return getArticleListStart(state, action);
    case actionTypes.GET_ARTICLES_LIST_SUCCESS:
      return getArticleListSuccess(state, action);
    case actionTypes.GET_ARTICLES_LIST_FAIL:
      return getArticleListFail(state, action);
    case actionTypes.GET_ARTICLE_DETAIL_START:
      return getArticleDetailStart(state, action);
    case actionTypes.GET_ARTICLE_DETAIL_SUCCESS:
      return getArticleDetailSuccess(state, action);
    case actionTypes.GET_ARTICLE_DETAIL_FAIL:
      return getArticleDetailFail(state, action);
    case actionTypes.CREATE_ARTICLE_START:
      return createArticleStart(state, action);
    case actionTypes.CREATE_ARTICLE_SUCCESS:
      return createArticleSuccess(state, action);
    case actionTypes.CREATE_ARTICLE_FAIL:
      return createArticleFail(state, action);
    default:
      return state;
  }
};

export default reducer;
