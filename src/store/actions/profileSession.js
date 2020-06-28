import axios from "axios";
import {
  GET_PROFILE_SESSIONS_LIST_FAIL,
  GET_PROFILE_SESSIONS_LIST_SUCCESS,
  GET_PROFILE_SESSION_DETAIL_FAIL,
  GET_PROFILE_SESSION_DETAIL_SUCCESS,
  PUT_PROFILE_SESSION_DETAIL_FAIL,
  PUT_PROFILE_SESSION_DETAIL_SUCCESS,
  DELETE_PROFILE_SESSION_DETAIL_FAIL,
  DELETE_PROFILE_SESSION_DETAIL_SUCCESS
} from "./actionTypes";
import {
  profileSessionListURL,
  profileSessionDetailURL,
  profileSessionRoomURL
} from "../../constants"

const getProfileSessionListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_SESSIONS_LIST_SUCCESS ,
    data
  };
};

const getProfileSessionListFail = error => {
  return {
    type: GET_PROFILE_SESSIONS_LIST_FAIL,
    error: error
  };
};

export const getProfileSessionList = (token, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileSessionListURL(username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileSessionListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileSessionListFail(err));
        })
    }
}

const getProfileSessionDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_SESSION_DETAIL_SUCCESS ,
    data
  };
};

const getProfileSessionDetailFail = error => {
  return {
    type: GET_PROFILE_SESSION_DETAIL_FAIL,
    error: error
  };
};

export const getProfileSessionDetail = (token, sessionID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileSessionRoomURL(sessionID, username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileSessionDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileSessionDetailFail(err));
        })
    }
}

const putProfileSessionDetailSuccess = data => {
  console.log("2) Actions putProfileSessionDetailSuccess")
  return {
    type: PUT_PROFILE_SESSION_DETAIL_FAIL,
    data
  };
};

const putProfileSessionDetailFail = error => {
  return {
    type: PUT_PROFILE_SESSION_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileSessionDetail = (token, sessoinID, username, data) => {
    return dispatch => {
      console.log(" putProfileSessionDetail ")
      console.log(" putProfileSessionDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(profileSessionDetailURL(sessoinID, username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileSessionDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileSessionDetailFail(err));
        })
    }
}

const deleteProfileSessionDetailSuccess = () => {
  console.log("2) Actions deleteProfileSessionDetailSuccess")
  return {
    type: DELETE_PROFILE_SESSION_DETAIL_SUCCESS,
  };
};

const deleteProfileSessionDetailFail = error => {
  return {
    type: DELETE_PROFILE_SESSION_DETAIL_FAIL,
    error: error
  };
};

export const deleteProfileSessionDetail = (token, sessoinID, username) => {
    return dispatch => {
      console.log(" putProfileSessionDetail ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.delete(profileSessionDetailURL(sessoinID, username))
        .then(res => {
            dispatch(deleteProfileSessionDetailSuccess());
        })
        .catch(err => {
            dispatch(deleteProfileSessionDetailFail(err));
        })
    }
}