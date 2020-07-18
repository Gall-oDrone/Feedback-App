import axios from "axios";
import * as actionTypes from "./actionTypes";

const getProjectListStart = () => {
  console.log("1) Actions getProjectListStart")
  return {
    type: actionTypes.GET_PROJECT_LIST_START
  };
};

const getProjectListSuccess = articles => {
  console.log("2) Actions getProjectListSuccess")
  return {
    type: actionTypes.GET_PROJECTS_LIST_SUCCESS,
    articles
  };
};

const getProjectListFail = error => {
  return {
    type: actionTypes.GET_PROJECTS_LIST_FAIL,
    error: error
  };
};

export const getProject = token => {
    return dispatch => {
      console.log(" getProject: ")
        dispatch(getProjectListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get("http://127.0.0.1:8000/articles/")
        .then(res => {
            const articles = res.data;
            dispatch(getProjectListSuccess(articles));
        })
        .catch(err => {
            dispatch(getProjectListFail());
        })
    }
}

const getProjectDetailStart = () => {
  return {
    type: actionTypes.GET_PROJECT_DETAIL_START
  };
};

const getProjectDetailSuccess = article => {
  return {
    type: actionTypes.GET_PROJECT_DETAIL_SUCCESS,
    article
  };
};

const getProjectDetailFail = error => {
  return {
    type: actionTypes.GET_PROJECT_DETAIL_FAIL,
    error: error
  };
};

export const getProjectDetail = (token, articleID) => {
    return dispatch => {
        dispatch(getProjectDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/articles/${articleID}/`)
        .then(res => {
            const article = res.data;
            dispatch(getProjectDetailSuccess(article));
        })
        .catch(err => {
            dispatch(getProjectDetailFail());
        })
    }
}

const createProjectStart = () => {
  return {
    type: actionTypes.CREATE_PROJECT_START
  };
};

const createProjectSuccess = article => {
  return {
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    article
  };
};

const createProjectFail = error => {
  return {
    type: actionTypes.CREATE_PROJECT_FAIL,
    error: error
  };
};

export const createProject = (token, article) => {
    return dispatch => {
        dispatch(createProjectStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(`http://127.0.0.1:8000/articles/`, article)
        .then(res => {
            
            dispatch(createProjectSuccess());
        })
        .catch(err => {
            dispatch(createProjectFail());
        })
    }
}