import axios from "axios";
import {
    GET_PROJECT_LIKES_START,
    GET_PROJECT_LIKES_FAIL,
    GET_PROJECT_LIKES_SUCCESS,
    PROJECT_LIKE_START,
    PROJECT_LIKE_SUCCESS,
    PROJECT_LIKE_FAIL,
    GET_PROJECT_LIKE_DETAIL_START,
    GET_PROJECT_LIKE_DETAIL_SUCCESS,
    GET_PROJECT_LIKE_DETAIL_FAIL
} from "./actionTypes";
import {
  projectLikeUpdateURL,
  fetchProjectLikeURL,
  fetchProjectLikeCounterURL,
} from "../../constants"

export const likeStart = () => {
  console.log("Actions likestart data")  
  return {
    type: PROJECT_LIKE_START
  };
};

export const likeSuccess = data => {
  console.log("Actions likeSuccess data")  
  console.log(data)
  return {
    type: PROJECT_LIKE_SUCCESS,
    data
  };
};

export const likeFail = error => {
  console.log("Actions likeFail data")  
  return {
    type: PROJECT_LIKE_FAIL,
    error: error
  };
};

export const fetchLikeCounter = (articleID) => {
    console.log("fetchLike before return dispatch")
    console.log(articleID)
    return dispatch => {
      // dispatch(likeStart());
      axios.defaults.headers = {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`
      };
      axios
        .get(fetchProjectLikeCounterURL(articleID))
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
      type: GET_PROJECT_LIKE_DETAIL_START
    };
  };
  
  const getLikeDetailSuccess = data => {
    console.log("2) Actions getLikeDetailSuccess")
    return {
      type: GET_PROJECT_LIKE_DETAIL_SUCCESS,
      data
    };
  };
  
  const getLikeDetailFail = error => {
    return {
      type: GET_PROJECT_LIKE_DETAIL_FAIL,
      error: error
    };
  };
  
  export const getLiked = (token, articleID, userID) => {
    if(userID !== null && userID !== undefined){
      return dispatch => {
        console.log(" getComment: ")
          // dispatch(getLikeDetailStart());
          axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`
          }
          axios.get(projectLikeUpdateURL(articleID, userID))
          .then(res => {
              const data = res.data;
              dispatch(getLikeDetailSuccess(data));
          })
          .catch(err => {
              dispatch(getLikeDetailFail());
          })
      }
    }
      
  }