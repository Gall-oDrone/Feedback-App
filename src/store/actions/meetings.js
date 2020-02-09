import axios from "axios";
import {
  CREATE_MEETING_START,
  CREATE_MEETING_FAIL,
  CREATE_MEETING_SUCCESS,
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

export const createMeetingStart = () => {
  console.log("Actions ratingstart data")  
  return {
    type: CREATE_MEETING_START
  };
};

export const createMeetingSuccess = (sender, date, topic) => {
  console.log("createMeetingSuccess data")  
  return {
    type: CREATE_MEETING_SUCCESS,
    sender,
    date,
    topic
  };
};

export const createMeetingFail = error => {
  console.log("Actions meetingFail data")
  console.log("Actions meetingFail error: "+ JSON.stringify(error))  
  return {
    type: CREATE_MEETING_FAIL,
    error: error
  };
};

export const createMeeting = (token, meeting) => {
  console.log("meeting at Actions: "+JSON.stringify(meeting))
  return dispatch => {
    dispatch(createMeetingStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/live-chat/lcrequest/create/`, meeting)
      .then(res => {
        if (res.status === 201) {
          console.log("success");
          dispatch(createMeetingSuccess());
          } else {
            dispatch(createMeetingFail());
          }
      })
      .catch(err => {
        dispatch(createMeetingFail());
      });
  };
};

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
      .get(`http://127.0.0.1:8000/live-chat/lcrequest/userlist/${username}`)
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
      .get(`http://127.0.0.1:8000/live-chat/lcrequest/received/userlist/${username}`)
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
      .get(`http://127.0.0.1:8000/live-chat/lcrequest/booked/userlist/${username}`)
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
        axios.get(`http://127.0.0.1:8000/live-chat/lcrequest/listdetail/${articleID}/${userID}`)
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
        axios.put(`http://127.0.0.1:8000/live-chat/lcrequest/listdetail/${articleID}/${userID}`, data)
        .then(res => {
            
            dispatch(updateMeetingSuccess());
        })
        .catch(err => {
            dispatch(updateMeetingFail());
        })
    }
}