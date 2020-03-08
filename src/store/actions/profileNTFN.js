import axios from "axios";
import {
  GET_PROFILE_NOTIFICATION_LIST_START,
  GET_PROFILE_NOTIFICATIONS_LIST_FAIL,
  GET_PROFILE_NOTIFICATIONS_LIST_SUCCESS,
  GET_PROFILE_NOTIFICATION_DETAIL_START,
  GET_PROFILE_NOTIFICATION_DETAIL_FAIL,
  GET_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
  PUT_PROFILE_NOTIFICATION_LIST_START,
  PUT_PROFILE_NOTIFICATION_LIST_FAIL,
  PUT_PROFILE_NOTIFICATION_LIST_SUCCESS,
  PUT_PROFILE_NOTIFICATION_DETAIL_START,
  PUT_PROFILE_NOTIFICATION_DETAIL_FAIL,
  PUT_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
  DELETE_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
  DELETE_PROFILE_NOTIFICATION_DETAIL_FAIL
} from "./actionTypes";
import {
  notificationListURL,
  notificationDetailURL,
  notificationUpdateURL,
  notificationUpdateListURL,
  notificationCreateURL,
  notificationURL
} from "../../constants"

const getProfileNotificationListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_NOTIFICATION_LIST_START
  };
};

const getProfileNotificationListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_NOTIFICATIONS_LIST_SUCCESS ,
    data
  };
};

const getProfileNotificationListFail = error => {
  return {
    type: GET_PROFILE_NOTIFICATIONS_LIST_FAIL,
    error: error
  };
};

export const getProfileNotificationList = (token, username) => {
    return dispatch => {
      console.log(" getProfileNotificationList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(notificationListURL(username))
        // axios.get(`http://127.0.0.1:8000/notifications/list/${username}/`)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileNotificationListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileNotificationListFail(err));
        })
    }
}

const getProfileNotificationDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_NOTIFICATION_DETAIL_START
  };
};

const getProfileNotificationDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_NOTIFICATION_DETAIL_SUCCESS ,
    data
  };
};

const getProfileNotificationDetailFail = error => {
  return {
    type: GET_PROFILE_NOTIFICATION_DETAIL_FAIL,
    error: error
  };
};

export const getProfileNotificationDetail = (token, notificationID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(notificationDetailURL(notificationID,username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileNotificationDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileNotificationDetailFail(err));
        })
    }
}

const putProfileNotificationListStart = () => {
  console.log("1) Actions putProfileNotificationDetailStart")
  return {
    type: PUT_PROFILE_NOTIFICATION_LIST_START
  };
};

const putProfileNotificationListSuccess = () => {
  console.log("2) Actions putProfileNotificationDetailSuccess")
  return {
    type: PUT_PROFILE_NOTIFICATION_LIST_SUCCESS,
  };
};

const putProfileNotificationListFail = error => {
  return {
    type:  PUT_PROFILE_NOTIFICATION_LIST_FAIL,
    error: error
  };
};

export const putProfileNotificationList = (token, username, data) => {
    return dispatch => {
      console.log(" putProfileNotificationList ")
      console.log(" putProfileNotificationList data: "+ JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'application/json',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(notificationUpdateListURL(username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileNotificationListSuccess());
        })
        .catch(err => {
            dispatch(putProfileNotificationListFail(err));
        })
    }
}

const putProfileNotificationDetailStart = () => {
  console.log("1) Actions putProfileNotificationDetailStart")
  return {
    type: PUT_PROFILE_NOTIFICATION_DETAIL_START
  };
};

const putProfileNotificationDetailSuccess = data => {
  console.log("2) Actions putProfileNotificationDetailSuccess")
  return {
    type: PUT_PROFILE_NOTIFICATION_DETAIL_FAIL,
    data
  };
};

const putProfileNotificationDetailFail = error => {
  return {
    type: PUT_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileNotificationDetail = (token, notificationID, username, data) => {
    return dispatch => {
      console.log(" putProfileNotificationDetail ")
      console.log(" putProfileNotificationDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(notificationUpdateURL(notificationID, username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileNotificationDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileNotificationDetailFail(err));
        })
    }
}

const deleteProfileNotificationDetailSuccess = () => {
  console.log("2) Actions deleteProfileNotificationDetailSuccess")
  return {
    type: DELETE_PROFILE_NOTIFICATION_DETAIL_SUCCESS,
  };
};

const deleteProfileNotificationDetailFail = error => {
  return {
    type: DELETE_PROFILE_NOTIFICATION_DETAIL_FAIL,
    error: error
  };
};

export const deleteProfileNotificationDetail = (token, notificationID, username) => {
    return dispatch => {
      console.log(" putProfileNotificationDetail ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.delete(`http://127.0.0.1:8000/notifications/${notificationID}/detail/delete/${username}/`)
        .then(res => {
            dispatch(deleteProfileNotificationDetailSuccess());
        })
        .catch(err => {
            dispatch(deleteProfileNotificationDetailFail(err));
        })
    }
}