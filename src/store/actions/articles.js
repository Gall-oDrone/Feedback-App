import axios from "axios";
import * as actionTypes from "./actionTypes";

const getArticleListStart = () => {
  console.log("1) Actions getArticleListStart")
  return {
    type: actionTypes.GET_ARTICLE_LIST_START
  };
};

const getArticleListSuccess = articles => {
  console.log("2) Actions getArticleListSuccess")
  return {
    type: actionTypes.GET_ARTICLES_LIST_SUCCESS,
    articles
  };
};

const getArticleListFail = error => {
  return {
    type: actionTypes.GET_ARTICLES_LIST_FAIL,
    error: error
  };
};

export const getArticle = token => {
    return dispatch => {
      console.log(" getArticle: ")
        dispatch(getArticleListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get("http://127.0.0.1:8000/articles/")
        .then(res => {
            const articles = res.data;
            dispatch(getArticleListSuccess(articles));
        })
        .catch(err => {
            dispatch(getArticleListFail());
        })
    }
}

const getArticleDetailStart = () => {
  return {
    type: actionTypes.GET_ARTICLE_DETAIL_START
  };
};

const getArticleDetailSuccess = article => {
  return {
    type: actionTypes.GET_ARTICLE_DETAIL_SUCCESS,
    article
  };
};

const getArticleDetailFail = error => {
  return {
    type: actionTypes.GET_ARTICLE_DETAIL_FAIL,
    error: error
  };
};

export const getArticleDetail = (token, articleID) => {
    return dispatch => {
        dispatch(getArticleDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/articles/${articleID}/`)
        .then(res => {
            const article = res.data;
            dispatch(getArticleDetailSuccess(article));
        })
        .catch(err => {
            dispatch(getArticleDetailFail());
        })
    }
}

const createArticleStart = () => {
  return {
    type: actionTypes.CREATE_ARTICLE_START
  };
};

const createArticleSuccess = article => {
  return {
    type: actionTypes.CREATE_ARTICLE_SUCCESS,
    article
  };
};

const createArticleFail = error => {
  return {
    type: actionTypes.CREATE_ARTICLE_FAIL,
    error: error
  };
};

export const createArticle = (token, article) => {
    return dispatch => {
        dispatch(createArticleStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(`http://127.0.0.1:8000/articles/`, article)
        .then(res => {
            
            dispatch(createArticleSuccess());
        })
        .catch(err => {
            dispatch(createArticleFail());
        })
    }
}