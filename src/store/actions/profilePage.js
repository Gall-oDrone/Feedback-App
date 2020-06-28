import axios from "axios";
import {
  GET_PROFILE_PAGE_START,
  GET_PROFILE_PAGE_FAIL,
  GET_PROFILE_PAGE_SUCCESS,
} from "./actionTypes";
import {
  profilePageURL,
} from "../../constants"

const getProfilePageStart = () => {
  console.log("1) Actions getProfilePageStart")
  return {
    type: GET_PROFILE_PAGE_START
  };
};

const getProfilePageSuccess = data => {
  console.log("2) Actions getProfilePageSuccess")
  return {
    type: GET_PROFILE_PAGE_SUCCESS,
    data
  };
};

const getProfilePageFail = error => {
  return {
    type: GET_PROFILE_PAGE_FAIL,
    error: error
  };
};

export const getProfilePage = (token, userID) => {
    return dispatch => {
      console.log(" getProfilePage ")
      console.log(" token, userID: "+ token, userID)
        // dispatch(getProfilePageStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profilePageURL(userID))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfilePageSuccess(data));
        })
        .catch(err => {
            dispatch(getProfilePageFail(err));
        })
    }
}