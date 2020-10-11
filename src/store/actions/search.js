import axios from "axios";
import {
  GLOBAL_SEARCH_SUCCESS,
  GLOBAL_SEARCH_FAIL,
} from "./actionTypes";
import {
  searchListURL
} from "../../constants"

export const searchSuccess = data => {
  console.log("Actions searchSuccess data")  
  console.log(data)
  return {
    type: GLOBAL_SEARCH_SUCCESS,
    data
  };
};

export const searchFail = error => {
  console.log("Actions searchFail data")  
  return {
    type: GLOBAL_SEARCH_FAIL,
    error: error
  };
};

export const fetchSearchResults = (getObj) => {
    return dispatch => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
      };
      axios
        .get(searchListURL, getObj)
        .then(res => {
          dispatch(searchSuccess(res.data));
        })
        .catch(err => {
          dispatch(searchFail(err));
        });
    };
  };