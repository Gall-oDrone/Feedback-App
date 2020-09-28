import axios from "axios";
import {
  GET_PROFILE_PROJECT_LIST_START,
  GET_PROFILE_PROJECT_LIST_SUCCESS,
  GET_PROFILE_PROJECT_LIST_FAIL,
  GET_PROFILE_PROJECT_DETAIL_START,
  GET_PROFILE_PROJECT_DETAIL_FAIL,
  GET_PROFILE_PROJECT_DETAIL_SUCCESS,
  PUT_PROFILE_PROJECT_DETAIL_START,
  PUT_PROFILE_PROJECT_DETAIL_FAIL,
  PUT_PROFILE_PROJECT_DETAIL_SUCCESS,
  DELETE_PROFILE_PROJECT_DETAIL_FAIL,
  DELETE_PROFILE_PROJECT_DETAIL_SUCCESS
} from "./actionTypes";
import {
  projectListURL,
  projectDetailURL,
  projectCreateURL,
  profileProjectListURL,
  profileProjectDetailURL,
  projectURL
} from "../../constants"

const getProfileProjectListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_PROJECT_LIST_START
  };
};

const getProfileProjectListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_PROJECT_LIST_SUCCESS ,
    data
  };
};

const getProfileProjectListFail = error => {
  return {
    type: GET_PROFILE_PROJECT_LIST_FAIL,
    error: error
  };
};

export const getProfileProjectList = (token, username) => {
    return dispatch => {
      console.log(" getProfileProjectList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileProjectListURL(username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileProjectListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileProjectListFail(err));
        })
    }
}

const getProfileProjectDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_PROJECT_DETAIL_START
  };
};

const getProfileProjectDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_PROJECT_DETAIL_SUCCESS ,
    data
  };
};

const getProfileProjectDetailFail = error => {
  return {
    type: GET_PROFILE_PROJECT_DETAIL_FAIL,
    error: error
  };
};

export const getProfileProjectDetail = (token, projectID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileProjectDetailURL(projectID, username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileProjectDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileProjectDetailFail(err));
        })
    }
}

const putProfileProjectDetailStart = () => {
  console.log("1) Actions putProfileProjectDetailStart")
  return {
    type: PUT_PROFILE_PROJECT_DETAIL_START
  };
};

const putProfileProjectDetailSuccess = data => {
  console.log("2) Actions putProfileProjectDetailSuccess")
  return {
    type: PUT_PROFILE_PROJECT_DETAIL_FAIL,
    data
  };
};

const putProfileProjectDetailFail = error => {
  return {
    type: PUT_PROFILE_PROJECT_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileProjectDetail = (token, projectID, username, data) => {
    return dispatch => {
      console.log(" putProfileProjectDetail ")
      console.log(" putProfileProjectDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          "Content-Type": "application/json",
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(profileProjectDetailURL(projectID, username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileProjectDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileProjectDetailFail(err));
        })
    }
}

const deleteProfileProjectDetailSuccess = () => {
  console.log("2) Actions deleteProfileProjectDetailSuccess")
  return {
    type: DELETE_PROFILE_PROJECT_DETAIL_SUCCESS,
  };
};

const deleteProfileProjectDetailFail = error => {
  return {
    type: DELETE_PROFILE_PROJECT_DETAIL_FAIL,
    error: error
  };
};

export const deleteProfileProjectDetail = (token, projectID, username) => {
    return dispatch => {
      console.log(" putProfileProjectDetail ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.delete(profileProjectDetailURL(projectID, username))
        .then(res => {
            dispatch(deleteProfileProjectDetailSuccess());
        })
        .catch(err => {
            dispatch(deleteProfileProjectDetailFail(err));
        })
    }
}