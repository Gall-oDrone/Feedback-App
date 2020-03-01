import axios from "axios";
import {
    GET_RATING_START,
    GET_RATING_SUCCESS,
    GET_RATING_FAIL,
    CREATE_RATING_START,
    CREATE_RATING_FAIL,
    CREATE_RATING_SUCCESS,
} from "./actionTypes";

export const createRatingStart = () => {
  console.log("Actions ratingstart data")  
  return {
    type: CREATE_RATING_START
  };
};

export const createRatingSuccess = (rating_count, avg_rating) => {
  console.log("ratingSuccess data")  
  return {
    type: CREATE_RATING_SUCCESS,
    rating_count,
    avg_rating
  };
};

export const createRatingFail = error => {
  console.log("Actions ratingFail data")  
  return {
    type: CREATE_RATING_FAIL,
    error: error
  };
};

export const ratingStart = () => {
  console.log("Actions ratingstart data")  
  return {
    type: GET_RATING_START
  };
};

export const ratingSuccess = (rating_count, avg_rating) => {
  console.log("ratingSuccess data")  
  return {
    type: GET_RATING_SUCCESS,
    rating_count,
    avg_rating
  };
};

export const ratingFail = error => {
  console.log("Actions ratingFail data")  
  return {
    type: GET_RATING_FAIL,
    error: error
  };
};

export const createRating = (token, data) => {
  console.log("createRating post Data")
  console.log(JSON.stringify(data))
  return dispatch => {
    dispatch(createRatingStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
        .post(`http://127.0.0.1:8000/articles/${data.articleID}/rating/`, data)
        .then(res => {
            dispatch(createRatingSuccess());
        })
        .catch(err => {
            dispatch(createRatingFail());
        })
  };
}

export const fetchRating = (token, articleID) => {
    console.log("fetchRating before return dispatch")
    console.log(token)
    console.log(articleID)
    return dispatch => {
      dispatch(ratingStart());
      axios.defaults.headers = {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`
      };
      axios
        .get(`http://127.0.0.1:8000/articles/${articleID}`)
        .then(res => {
          dispatch(ratingSuccess(res.data.rating_count, res.data.avg_rating));
        })
        .catch(err => {
          dispatch(ratingFail(err));
        });
    };
  };