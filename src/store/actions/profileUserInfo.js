import axios from "axios";
import {
  GET_USER_PROFILE_INFO_START,
  GET_USER_PROFILE_INFO_FAIL,
  GET_USER_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_START,
  GET_PROFILE_INFO_FAIL,
  GET_PROFILE_INFO_SUCCESS,
  PUT_PROFILE_INFO_START,
  PUT_PROFILE_INFO_SUCCESS,
  PUT_PROFILE_INFO_FAIL
} from "./actionTypes";

const getProfileMeetingInfoStart = () => {
  console.log("getProfileMeetingInfoStart")  
  return {
    type: GET_USER_PROFILE_INFO_START
  };
};

const getProfileMeetingInfoSuccess = data => {
  console.log("getProfileMeetingInfoSuccess")
  console.log("getProfileMeetingInfoSuccess data: "+ JSON.stringify(data))  
  return {
    type: GET_USER_PROFILE_INFO_SUCCESS,
    data
  };
};

const getProfileMeetingInfoFail = error => {
  console.log("getProfileMeetingInfoFail")
  return {
    type: GET_USER_PROFILE_INFO_FAIL,
    error: error
  };
};

export const getProfileMeetingInfo = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getProfileMeetingInfoStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/users/profile/info/${username}`)
      .then(res => {
        console.log("getProfileMeetingInfo data")
        const userInfo = res.data;
        console.log("userInfo: " + JSON.stringify(userInfo))
        dispatch(getProfileMeetingInfoSuccess(userInfo));
      })
      .catch(err => {
        dispatch(getProfileMeetingInfoFail(err));
      });
  };
};

const getProfileAccountInfoStart = () => {
  console.log("1) Actions getProfileAccountInfoStart")
  return {
    type: GET_PROFILE_INFO_START
  };
};

const getProfileAccountInfoSuccess = data => {
  console.log("2) Actions getProfileAccountInfoSuccess")
  return {
    type: GET_PROFILE_INFO_SUCCESS,
    data
  };
};

const getProfileAccountInfoFail = error => {
  return {
    type: GET_PROFILE_INFO_FAIL,
    error: error
  };
};

export const getProfileAccountInfo = (token, userID) => {
    return dispatch => {
      console.log(" getProfileAccountInfo ")
      console.log(" token, userID: "+ token, userID)
        // dispatch(getProfileAccountInfoStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/users/profile/account/user/info/${userID}`)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileAccountInfoSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileAccountInfoFail(err));
        })
    }
}

const putProfileAccountInfoStart = () => {
  console.log("1) Actions getProfileAccountInfoStart")
  return {
    type: PUT_PROFILE_INFO_START
  };
};

const putProfileAccountInfoSuccess = data => {
  console.log("2) Actions getProfileAccountInfoSuccess")
  return {
    type: PUT_PROFILE_INFO_SUCCESS,
    data
  };
};

const putProfileAccountInfoFail = error => {
  return {
    type: PUT_PROFILE_INFO_FAIL,
    error: error
  };
};

export const putProfileAccountInfo = (token, username, data) => {
    return dispatch => {
      console.log(" putProfileAccountInfo ")
        // dispatch(getProfileAccountInfoStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(`http://127.0.0.1:8000/users/profile/account/user/info/update/${username}`, data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileAccountInfoSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileAccountInfoFail(err));
        })
    }
}