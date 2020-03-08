import axios from "axios";
// var request = require("request");
import {
  GET_ROOM_DETAIL_START,
  GET_ROOM_DETAIL_FAIL,
  GET_ROOM_DETAIL_SUCCESS,
  PUT_ROOM_DETAIL_START,
  PUT_ROOM_DETAIL_SUCCESS,
  PUT_ROOM_DETAIL_FAIL,
  GET_MEETING_LIST_START,
  GET_MEETINGS_LIST_FAIL,
  GET_MEETINGS_LIST_SUCCESS,
  GET_MEETING_DETAIL_START,
  GET_MEETING_DETAIL_FAIL,
  GET_MEETING_DETAIL_SUCCESS,
  GET_RECEVIED_MEETING_LIST_START,
  GET_RECEVIED_MEETINGS_LIST_SUCCESS,
  GET_RECEVIED_MEETINGS_LIST_FAIL,
  GET_BOOKED_MEETING_LIST_START,
  GET_BOOKED_MEETINGS_LIST_SUCCESS,
  GET_BOOKED_MEETINGS_LIST_FAIL,
  DELETE_MEETING_START,
  DELETE_MEETING_FAIL,
  DELETE_MEETING_SUCCESS,
  PUT_MEETING_DETAIL_START,
  PUT_MEETING_DETAIL_SUCCESS,
  PUT_MEETING_DETAIL_FAIL
} from "./actionTypes";

import {
  lcroomCreateURL,
  lcroomDetailURL,
  lcroomListURL,
  lcroomUserMeetingReceivedURL,
  lcroomBookedURL,
  lcroomListDetailURL
} from "../../constants"

export const getDetailRoomStart = () => {
  console.log("Actions getDetailRoomStart")  
  return {
    type: GET_ROOM_DETAIL_START
  };
};

export const getDetailRoomSuccess = meetingDetailRoom => {
  console.log("getDetailRoomSuccess data")  
  return {
    type: GET_ROOM_DETAIL_SUCCESS,
    meetingDetailRoom
  };
};

export const getDetailRoomFail = error => {
  console.log("Actions getDetailRoomFail data")
  console.log("Actions getDetailRoomFail error: "+ JSON.stringify(error))  
  return {
    type: GET_ROOM_DETAIL_FAIL,
    error: error
  };
};

export const getDetailRoom = (token, roomName) => {
console.log("getDetailRoom at Actions")
return dispatch => {
  dispatch(getDetailRoomStart());
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`
  };
  axios
    .get(lcroomDetailURL(roomName))
    .then(res => {
      console.log("RES After axios.get.then")
      const meetingDetailRoom = res.data;
      console.log("EHRENO 2")
      dispatch(getDetailRoomSuccess(meetingDetailRoom));
    })
    .catch(err => {
      dispatch(getDetailRoomFail(err));
    });
};
}

const getUserMeetingListStart = () => {
  return {
    type: GET_MEETING_LIST_START
  };
};

const getUserMeetingListSuccess = meetingList => {
  return {
    type: GET_MEETINGS_LIST_SUCCESS,
    meetingList
  };
};

const getUserMeetingListFail = error => {
  return {
    type: GET_MEETINGS_LIST_FAIL,
    error: error
  };
};

export const getUserMeeting = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getUserMeetingListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(lcroomListURL(username))
      .then(res => {
        console.log("EHRENO")
        const meetingList = res.data;
        console.log("EHRENO 2")
        dispatch(getUserMeetingListSuccess(meetingList));
      })
      .catch(err => {
        dispatch(getUserMeetingListFail(err));
      });
  };
};

const getUserReceivedMeetingListStart = () => {
  return {
    type: GET_RECEVIED_MEETING_LIST_START
  };
};

const getUserReceivedMeetingListSuccess = meetingList => {
  return {
    type: GET_RECEVIED_MEETINGS_LIST_SUCCESS,
    meetingList
  };
};

const getUserReceivedMeetingListFail = error => {
  return {
    type: GET_RECEVIED_MEETINGS_LIST_FAIL,
    error: error
  };
};

export const getUserReceivedMeeting = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getUserReceivedMeetingListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(lcroomUserMeetingReceivedURL(username))
      .then(res => {
        console.log("EHRENO")
        const meetingList = res.data;
        console.log("EHRENO 2")
        dispatch(getUserReceivedMeetingListSuccess(meetingList));
      })
      .catch(err => {
        dispatch(getUserReceivedMeetingListFail(err));
      });
  };
};

const getUserBookedMeetingListStart = () => {
  return {
    type: GET_BOOKED_MEETING_LIST_START
  };
};

const getUserBookedMeetingListSuccess = meetingList => {
  return {
    type: GET_BOOKED_MEETINGS_LIST_SUCCESS,
    meetingList
  };
};

const getUserBookedMeetingListFail = error => {
  return {
    type: GET_BOOKED_MEETINGS_LIST_FAIL,
    error: error
  };
};

export const getUserBookedMeeting = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getUserBookedMeetingListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(lcroomBookedURL(username))
      .then(res => {
        console.log("EHRENO")
        const meetingList = res.data;
        console.log("EHRENO 2")
        dispatch(getUserBookedMeetingListSuccess(meetingList));
      })
      .catch(err => {
        dispatch(getUserBookedMeetingListFail(err));
      });
  };
};

const getMeetingDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_MEETING_DETAIL_START
  };
};

const getMeetingDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_MEETING_DETAIL_SUCCESS,
    data
  };
};

const getMeetingDetailFail = error => {
  return {
    type: GET_MEETING_DETAIL_FAIL,
    error: error
  };
};

export const getDetailMeetingList = (token, articleID, userID) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
      console.log(" token, articleID, userID: "+ token, articleID, userID)
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(lcroomListDetailURL(articleID, userID))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getMeetingDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getMeetingDetailFail(err));
        })
    }
}

const updateMeetingStart = () => {
  return {
    type: PUT_MEETING_DETAIL_START
  };
};

const updateMeetingSuccess = comment => {
  return {
    type: PUT_MEETING_DETAIL_SUCCESS,
    comment
  };
};

const updateMeetingFail = error => {
  return {
    type: PUT_MEETING_DETAIL_FAIL,
    error: error
  };
};

export const updateMeeting = (token, articleID, userID, data) => {
  console.log(JSON.stringify(data))
  console.log(JSON.stringify(articleID))
    return dispatch => {
        // dispatch(updateMeetingStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(lcroomListDetailURL(articleID, userID), data)
        .then(res => {
            
            dispatch(updateMeetingSuccess());
        })
        .catch(err => {
            dispatch(updateMeetingFail());
        })
    }
}

const updateRoomSuccess = () => {
  return {
    type: PUT_ROOM_DETAIL_SUCCESS    
  };
};

const updateRoomFail = error => {
  return {
    type: PUT_ROOM_DETAIL_FAIL,
    error: error
  };
};

export const updateRoom = (token, roomName, data) => {
  console.log(JSON.stringify(data))
    return dispatch => {
        // dispatch(updateMeetingStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(lcroomDetailURL(roomName), data)
        .then(res => {
            
            dispatch(updateRoomSuccess());
        })
        .catch(err => {
            dispatch(updateRoomFail());
        })
    }
}