import axios from "axios";
import {
  GET_PROFILE_MESSAGE_LIST_START,
  GET_PROFILE_MESSAGES_LIST_FAIL,
  GET_PROFILE_MESSAGES_LIST_SUCCESS,
  GET_PROFILE_MESSAGE_DETAIL_START,
  GET_PROFILE_MESSAGE_DETAIL_FAIL,
  GET_PROFILE_MESSAGE_DETAIL_SUCCESS,
  PUT_PROFILE_MESSAGE_LIST_START,
  PUT_PROFILE_MESSAGE_LIST_FAIL,
  PUT_PROFILE_MESSAGE_LIST_SUCCESS,
  PUT_PROFILE_MESSAGE_DETAIL_START,
  PUT_PROFILE_MESSAGE_DETAIL_FAIL,
  PUT_PROFILE_MESSAGE_DETAIL_SUCCESS,
  DELETE_PROFILE_MESSAGE_DETAIL_SUCCESS,
  DELETE_PROFILE_MESSAGE_DETAIL_FAIL
} from "./actionTypes";
import {
  messageListURL,
  messageDetailURL,
  messageUpdateURL,
  messageUpdateListURL,
  messageListScrollerURL,
  messageURL
} from "../../constants"

const getProfileMessageListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_MESSAGE_LIST_START
  };
};

const getProfileMessageListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_MESSAGES_LIST_SUCCESS ,
    data
  };
};

const getProfileMessageListFail = error => {
  return {
    type: GET_PROFILE_MESSAGES_LIST_FAIL,
    error: error
  };
};

export const getProfileMessageList = (token, username, limit, offset) => {
    return dispatch => {
      console.log(" getProfileMessageList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        // axios.get(messageListURL(username))
        axios.get(messageListScrollerURL(username, limit, offset))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileMessageListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileMessageListFail(err));
        })
    }
}

const getProfileMessageDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_MESSAGE_DETAIL_START
  };
};

const getProfileMessageDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_MESSAGE_DETAIL_SUCCESS ,
    data
  };
};

const getProfileMessageDetailFail = error => {
  return {
    type: GET_PROFILE_MESSAGE_DETAIL_FAIL,
    error: error
  };
};

export const getProfileMessageDetail = (token, messageID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(messageDetailURL(messageID,username))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileMessageDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileMessageDetailFail(err));
        })
    }
}

const putProfileMessageListStart = () => {
  console.log("1) Actions putProfileMessageDetailStart")
  return {
    type: PUT_PROFILE_MESSAGE_LIST_START
  };
};

const putProfileMessageListSuccess = () => {
  console.log("2) Actions putProfileMessageDetailSuccess")
  return {
    type: PUT_PROFILE_MESSAGE_LIST_SUCCESS,
  };
};

const putProfileMessageListFail = error => {
  return {
    type:  PUT_PROFILE_MESSAGE_LIST_FAIL,
    error: error
  };
};

export const putProfileMessageList = (token, username, data) => {
    return dispatch => {
      console.log(" putProfileMessageList ")
      console.log(" putProfileMessageList data: "+ JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'application/json',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(messageUpdateListURL(username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileMessageListSuccess());
        })
        .catch(err => {
            dispatch(putProfileMessageListFail(err));
        })
    }
}

const putProfileMessageDetailStart = () => {
  console.log("1) Actions putProfileMessageDetailStart")
  return {
    type: PUT_PROFILE_MESSAGE_DETAIL_START
  };
};

const putProfileMessageDetailSuccess = data => {
  console.log("2) Actions putProfileMessageDetailSuccess")
  return {
    type: PUT_PROFILE_MESSAGE_DETAIL_FAIL,
    data
  };
};

const putProfileMessageDetailFail = error => {
  return {
    type: PUT_PROFILE_MESSAGE_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileMessageDetail = (token, messageID, username, data) => {
    return dispatch => {
      console.log(" putProfileMessageDetail ")
      console.log(" putProfileMessageDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(messageUpdateURL(messageID, username), data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileMessageDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileMessageDetailFail(err));
        })
    }
}

const deleteProfileMessageDetailSuccess = () => {
  console.log("2) Actions deleteProfileMessageDetailSuccess")
  return {
    type: DELETE_PROFILE_MESSAGE_DETAIL_SUCCESS,
  };
};

const deleteProfileMessageDetailFail = error => {
  return {
    type: DELETE_PROFILE_MESSAGE_DETAIL_FAIL,
    error: error
  };
};

export const deleteProfileMessageDetail = (token, messageID, username) => {
    return dispatch => {
      console.log(" putProfileMessageDetail ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.delete(`http://127.0.0.1:8000/messages/${messageID}/detail/delete/${username}/`)
        .then(res => {
            dispatch(deleteProfileMessageDetailSuccess());
        })
        .catch(err => {
            dispatch(deleteProfileMessageDetailFail(err));
        })
    }
}