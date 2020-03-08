import axios from "axios";
import {
  CREATE_MEETING_REVIEW_DETAIL_START,
  CREATE_MEETING_REVIEW_DETAIL_SUCCESS,
  CREATE_MEETING_REVIEW_DETAIL_FAIL
} from "./actionTypes";
import {
  incentivesCreateURL,
  incentivesListURL,
  incentivesDetailURL
} from "../../constants"

const postMeetingReviewStart = () => {
  return {
    type: CREATE_MEETING_REVIEW_DETAIL_START
  };
};

const postMeetingReviewSuccess = () => {
  return {
    type: CREATE_MEETING_REVIEW_DETAIL_SUCCESS,
  };
};

const postMeetingReviewFail = error => {
  return {
    type: CREATE_MEETING_REVIEW_DETAIL_FAIL,
    error: error
  };
};

export const postMeetingReview = (token, userID, data) => {
  console.log(JSON.stringify(data))
    return dispatch => {
        // dispatch(postMeetingReviewStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(`http://127.0.0.1:8000/live-chat/lcrequest/lcroom/review/create/`, data)
        .then(res => {
            
            dispatch(postMeetingReviewSuccess());
        })
        .catch(err => {
            dispatch(postMeetingReviewFail());
        })
    }
}