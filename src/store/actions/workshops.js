import axios from "axios";
import * as actionTypes from "./actionTypes";

const getWorkshopListStart = () => {
  console.log("1) Actions getWorkshopListStart")
  return {
    type: actionTypes.GET_ARTICLE_LIST_START
  };
};

const getWorkshopListSuccess = workshops => {
  console.log("2) Actions getWorkshopListSuccess")
  return {
    type: actionTypes.GET_ARTICLES_LIST_SUCCESS,
    workshops
  };
};

const getWorkshopListFail = error => {
  return {
    type: actionTypes.GET_ARTICLES_LIST_FAIL,
    error: error
  };
};

export const getWorkshop = token => {
    return dispatch => {
      console.log(" getWorkshop: ")
        dispatch(getWorkshopListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get("http://127.0.0.1:8000/workshops/")
        .then(res => {
            const workshops = res.data;
            dispatch(getWorkshopListSuccess(workshops));
        })
        .catch(err => {
            dispatch(getWorkshopListFail());
        })
    }
}

const getWorkshopDetailStart = () => {
  return {
    type: actionTypes.GET_ARTICLE_DETAIL_START
  };
};

const getWorkshopDetailSuccess = workshop => {
  return {
    type: actionTypes.GET_ARTICLE_DETAIL_SUCCESS,
    workshop
  };
};

const getWorkshopDetailFail = error => {
  return {
    type: actionTypes.GET_ARTICLE_DETAIL_FAIL,
    error: error
  };
};

export const getWorkshopDetail = (token, workshopID) => {
    return dispatch => {
        dispatch(getWorkshopDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/workshops/${workshopID}/`)
        .then(res => {
            const workshop = res.data;
            dispatch(getWorkshopDetailSuccess(workshop));
        })
        .catch(err => {
            dispatch(getWorkshopDetailFail());
        })
    }
}

const createWorkshopStart = () => {
  return {
    type: actionTypes.CREATE_ARTICLE_START
  };
};

const createWorkshopSuccess = workshop => {
  return {
    type: actionTypes.CREATE_ARTICLE_SUCCESS,
    workshop
  };
};

const createWorkshopFail = error => {
  return {
    type: actionTypes.CREATE_ARTICLE_FAIL,
    error: error
  };
};

export const createWorkshop = (token, workshop) => {
    return dispatch => {
        dispatch(createWorkshopStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(`http://127.0.0.1:8000/workshops/`, workshop)
        .then(res => {
            
            dispatch(createWorkshopSuccess());
        })
        .catch(err => {
            dispatch(createWorkshopFail());
        })
    }
}