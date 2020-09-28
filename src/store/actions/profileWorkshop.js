import axios from "axios";
import {
  GET_PROFILE_WORKSHOP_LIST_START,
  GET_PROFILE_WORKSHOP_LIST_SUCCESS,
  GET_PROFILE_WORKSHOP_LIST_FAIL,
  GET_PROFILE_WORKSHOP_DETAIL_START,
  GET_PROFILE_WORKSHOP_DETAIL_FAIL,
  GET_PROFILE_WORKSHOP_DETAIL_SUCCESS,
  PUT_PROFILE_WORKSHOP_DETAIL_START,
  PUT_PROFILE_WORKSHOP_DETAIL_FAIL,
  PUT_PROFILE_WORKSHOP_DETAIL_SUCCESS,
  DELETE_PROFILE_WORKSHOP_DETAIL_FAIL,
  DELETE_PROFILE_WORKSHOP_DETAIL_SUCCESS
} from "./actionTypes";
import {
  projectListURL,
  projectDetailURL,
  projectCreateURL,
  profileWorkshopListURL,
  profileWorkshopDetailURL,
  projectURL
} from "../../constants"

const getProfileWorkshopListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_WORKSHOP_LIST_START
  };
};

const getProfileWorkshopListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_WORKSHOP_LIST_SUCCESS ,
    data
  };
};

const getProfileWorkshopListFail = error => {
  return {
    type: GET_PROFILE_WORKSHOP_LIST_FAIL,
    error: error
  };
};

export const getProfileWorkshopList = (token, username) => {
    return dispatch => {
      console.log(" getProfileWorkshopList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileWorkshopListURL(username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileWorkshopListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileWorkshopListFail(err));
        })
    }
}

const getProfileWorkshopDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_WORKSHOP_DETAIL_START
  };
};

const getProfileWorkshopDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_WORKSHOP_DETAIL_SUCCESS ,
    data
  };
};

const getProfileWorkshopDetailFail = error => {
  return {
    type: GET_PROFILE_WORKSHOP_DETAIL_FAIL,
    error: error
  };
};

export const getProfileWorkshopDetail = (token, projectID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(profileWorkshopDetailURL(projectID, username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileWorkshopDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileWorkshopDetailFail(err));
        })
    }
}

const putProfileWorkshopDetailStart = () => {
  console.log("1) Actions putProfileWorkshopDetailStart")
  return {
    type: PUT_PROFILE_WORKSHOP_DETAIL_START
  };
};

const putProfileWorkshopDetailSuccess = data => {
  console.log("2) Actions putProfileWorkshopDetailSuccess")
  return {
    type: PUT_PROFILE_WORKSHOP_DETAIL_FAIL,
    data
  };
};

const putProfileWorkshopDetailFail = error => {
  return {
    type: PUT_PROFILE_WORKSHOP_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileWorkshopDetail = (token, projectID, username, data) => {
    return dispatch => {
      console.log(" putProfileWorkshopDetail ")
      console.log(" putProfileWorkshopDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          "Content-Type": "application/json",
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(profileWorkshopDetailURL(projectID, username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileWorkshopDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileWorkshopDetailFail(err));
        })
    }
}

const deleteProfileWorkshopDetailSuccess = () => {
  console.log("2) Actions deleteProfileWorkshopDetailSuccess")
  return {
    type: DELETE_PROFILE_WORKSHOP_DETAIL_SUCCESS,
  };
};

const deleteProfileWorkshopDetailFail = error => {
  return {
    type: DELETE_PROFILE_WORKSHOP_DETAIL_FAIL,
    error: error
  };
};

export const deleteProfileWorkshopDetail = (token, projectID, username) => {
    return dispatch => {
      console.log(" putProfileWorkshopDetail ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.delete(profileWorkshopDetailURL(projectID, username))
        .then(res => {
            dispatch(deleteProfileWorkshopDetailSuccess());
        })
        .catch(err => {
            dispatch(deleteProfileWorkshopDetailFail(err));
        })
    }
}