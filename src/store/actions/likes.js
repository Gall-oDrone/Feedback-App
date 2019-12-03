import axios from "axios";
import {
    GET_LIKES_START,
    GET_LIKES_FAIL,
    GET_LIKES_SUCCESS,
    LIKE_START,
    LIKE_SUCCESS,
    LIKE_FAIL,
    GET_LIKE_DETAIL_START,
    GET_LIKE_DETAIL_SUCCESS,
    GET_LIKE_DETAIL_FAIL
} from "./actionTypes";

export const likeStart = () => {
  console.log("Actions likestart data")  
  return {
    type: LIKE_START
  };
};

export const likeSuccess = data => {
  console.log("Actions likeSuccess data")  
  console.log(data)
  return {
    type: LIKE_SUCCESS,
    data
  };
};

export const likeFail = error => {
  console.log("Actions likeFail data")  
  return {
    type: LIKE_FAIL,
    error: error
  };
};

export const fetchLikeCounter = (token, articleID) => {
    console.log("fetchLike before return dispatch")
    console.log(token)
    console.log(articleID)
    return dispatch => {
      dispatch(likeStart());
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .get(`http://127.0.0.1:8000/articles/${articleID}`)
        .then(res => {
          dispatch(likeSuccess(res.data.likes_count));
        })
        .catch(err => {
          dispatch(likeFail(err));
        });
    };
  };

  const getLikeDetailStart = () => {
    console.log("1) Actions getLikeDetailStart")
    return {
      type: GET_LIKE_DETAIL_START
    };
  };
  
  const getLikeDetailSuccess = data => {
    console.log("2) Actions getLikeDetailSuccess")
    return {
      type: GET_LIKE_DETAIL_SUCCESS,
      data
    };
  };
  
  const getLikeDetailFail = error => {
    return {
      type: GET_LIKE_DETAIL_FAIL,
      error: error
    };
  };
  
  export const getLiked = (token, articleID, userID) => {
      return dispatch => {
        console.log(" getComment: ")
          dispatch(getLikeDetailStart());
          axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`
          }
          axios.get(`http://127.0.0.1:8000/articles/${articleID}/likes/${userID}/`)
          .then(res => {
              const data = res.data;
              dispatch(getLikeDetailSuccess(data));
          })
          .catch(err => {
              dispatch(getLikeDetailFail());
          })
      }
  }