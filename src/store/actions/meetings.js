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
  DELETE_MEETING_START,
  DELETE_MEETING_FAIL,
  DELETE_MEETING_SUCCESS
} from "./actionTypes";

export const createMeetingStart = () => {
  console.log("Actions ratingstart data")  
  return {
    type: CREATE_MEETING_START
  };
};

export const createMeetingSuccess = (rating_count, avg_rating) => {
  console.log("ratingSuccess data")  
  return {
    type: CREATE_MEETING_SUCCESS,
    rating_count,
    avg_rating
  };
};

export const createMeetingFail = error => {
  console.log("Actions ratingFail data")  
  return {
    type: CREATE_MEETING_FAIL,
    error: error
  };
};

export const createMeeting = (token, asnt) => {
  return dispatch => {
    dispatch(createMeetingtart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/graded-assignments/create/`, asnt)
      .then(res => {
        console.log("success");
        dispatch(createMeetinguccess());
      })
      .catch(err => {
        dispatch(createASNTFail());
      });
  };
};

const getMeetingsListStart = () => {
  return {
    type: GET_MEETING_LIST_START
  };
};

const getMeetingsListSuccess = assignments => {
  return {
    type: GET_MEETINGS_LIST_SUCCESS,
    assignments
  };
};

const getMeetingsListFail = error => {
  return {
    type: GET_MEETINGS_LIST_FAIL,
    error: error
  };
};

export const getMeetings = (username, token) => {
  return dispatch => {
    dispatch(getMeetingsListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/graded-assignments/?username=${username}`)
      .then(res => {
        const assignments = res.data;
        dispatch(getMeetingsListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getMeetingsListFail(err));
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

export const getMeeting = (token, articleID, userID) => {
    return dispatch => {
      console.log(" getComment: ")
        dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/articles/${articleID}/likes/${userID}/`)
        .then(res => {
            const data = res.data;
            dispatch(getMeetingDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getMeetingDetailFail());
        })
    }
}