import axios from "axios";
import {
  CREATE_INCENTIVE_START,
  CREATE_INCENTIVE_FAIL,
  CREATE_INCENTIVE_SUCCESS,
  GET_INCENTIVE_LIST_START,
  GET_INCENTIVE_LIST_SUCCESS,
  GET_INCENTIVE_LIST_FAIL,
  GET_INCENTIVE_DETAIL_START,
  GET_INCENTIVE_DETAIL_FAIL,
  GET_INCENTIVE_DETAIL_SUCCESS,
} from "./actionTypes";

import {
  incentivesCreateURL,
  incentivesListURL,
  incentivesDetailURL
} from "../../constants"

export const createIncentiveStart = () => {
  console.log("createIncentiveStart")  
  return {
    type: CREATE_INCENTIVE_START
  };
};

export const createIncentiveSuccess = () => {
  console.log("createIncentiveSuccess data")  
  return {
    type: CREATE_INCENTIVE_SUCCESS,
  };
};

export const createIncentiveFail = error => {
  console.log("Actions createIncentiveFaill data")
  console.log("Actions createIncentiveFail error: "+ JSON.stringify(error))  
  return {
    type: CREATE_INCENTIVE_FAIL,
    error: error
  };
};

export const createIncentive = (token, data) => {
  console.log("meeting at Actions: "+JSON.stringify(data))
  return dispatch => {
    dispatch(createIncentiveStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(incentivesCreateURL, data)
      .then(res => {
        if (res.status === 201) {
          console.log("success");
          dispatch(createIncentiveSuccess());
          } else {
            dispatch(createIncentiveFail());
          }
      })
      .catch(err => {
        dispatch(createIncentiveFail());
      });
  };
};

const getUserIncentiveListStart = () => {
  return {
    type: GET_INCENTIVE_LIST_START
  };
};

const getUserIncentiveListSuccess = userIncentiveList => {
  return {
    type: GET_INCENTIVE_LIST_SUCCESS,
    userIncentiveList
  };
};

const getUserIncentiveListFail = error => {
  return {
    type: GET_INCENTIVE_LIST_FAIL,
    error: error
  };
};

export const getUserIncentiveList = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getUserIncentiveListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(incentivesListURL(username))
      .then(res => {
        console.log("EHRENO")
        const userIncentiveList = res.data;
        console.log("EHRENO 2")
        dispatch(getUserIncentiveListSuccess(userIncentiveList));
      })
      .catch(err => {
        dispatch(getUserIncentiveListFail(err));
      });
  };
};

const getUserReceivedIncentiveListStart = () => {
  return {
    // type: GET_RECEVIED_MEETING_LIST_START
  };
};

const getUserReceivedIncentiveListSuccess = meetingList => {
  return {
    // type: GET_RECEVIED_MEETINGS_LIST_SUCCESS,
    meetingList
  };
};

const getUserReceivedIncentiveListFail = error => {
  return {
    // type: GET_RECEVIED_MEETINGS_LIST_FAIL,
    error: error
  };
};

export const getUserReceivedIncentive = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getUserReceivedIncentiveListStart());
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
        dispatch(getUserReceivedIncentiveListSuccess(meetingList));
      })
      .catch(err => {
        dispatch(getUserReceivedIncentiveListFail(err));
      });
  };
};

const getIncentiveDetailStart = () => {
  console.log("1) Actions getIncentiveDetailStart")
  return {
    type: GET_INCENTIVE_DETAIL_START
  };
};

const getIncentiveDetailSuccess = data => {
  console.log("2) Actions getIncentiveDetailSuccess")
  return {
    type: GET_INCENTIVE_DETAIL_SUCCESS,
    data
  };
};

const getIncentiveDetailFail = error => {
  return {
    type: GET_INCENTIVE_DETAIL_FAIL,
    error: error
  };
};

export const getDetailIncentiveList = (token, userID) => {
    return dispatch => {
      console.log(" getDetailIncentiveList ")
      console.log(" token, articleID, userID: "+ token, userID)
        // dispatch(getIncentiveDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(incentivesDetailURL(userID))
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getIncentiveDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getIncentiveDetailFail(err));
        })
    }
}