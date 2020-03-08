import axios from "axios";
import {
    GET_INQUIRY_COMMENT_LIST_START,
    GET_INQUIRY_COMMENTS_LIST_FAIL,
    GET_INQUIRY_COMMENTS_LIST_SUCCESS,
    CREATE_INQUIRY_COMMENT_START,
    CREATE_INQUIRY_COMMENT_FAIL,
    CREATE_INQUIRY_COMMENT_SUCCESS,
    GET_INQUIRY_COMMENT_DETAIL_START,
    GET_INQUIRY_COMMENT_DETAIL_FAIL,
    GET_INQUIRY_COMMENT_DETAIL_SUCCESS,
    PUT_INQUIRY_COMMENT_START,
    PUT_INQUIRY_COMMENT_FAIL,
    PUT_INQUIRY_COMMENT_SUCCESS
} from "./actionTypes";
import {
  inquiryCommentsURL,
  inquiryCommentURL,
  inquiryCreateCommentURL,
  inquiryUpdateCommentURL
} from "../../constants"
// import inquiryCommentsURL from "../../constants"

const getCommentListStart = () => {
  console.log("1) Actions getCommentListStart")
  return {
    type: GET_INQUIRY_COMMENT_LIST_START
  };
};

const getCommentListSuccess = data => {
  console.log("2) Actions getCommentListSuccess")
  return {
    type: GET_INQUIRY_COMMENTS_LIST_SUCCESS,
    data
  };
};

const getCommentListFail = error => {
  return {
    type: GET_INQUIRY_COMMENTS_LIST_FAIL,
    error: error
  };
};

export const getComment = (token, inquiryID) => {
    return dispatch => {
      console.log(" getComment: ")
        dispatch(getCommentListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(inquiryCommentsURL(inquiryID))
        .then(res => {
            const data = res.data;
            dispatch(getCommentListSuccess(data));
        })
        .catch(err => {
            dispatch(getCommentListFail());
        })
    }
}

const getCommentDetailStart = () => {
  return {
    type: GET_INQUIRY_COMMENT_DETAIL_START
  };
};

const getCommentDetailSuccess = comments => {
  return {
    type: GET_INQUIRY_COMMENT_DETAIL_SUCCESS,
    comments
  };
};

const getCommentDetailFail = error => {
  return {
    type: GET_INQUIRY_COMMENT_DETAIL_FAIL,
    error: error
  };
};

export const getCommentDetail = (token, inquiryID, commentID) => {
    return dispatch => {
        dispatch(getCommentDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(inquiryCommentURL(inquiryID, commentID))
        .then(res => {
            const comments = res.data;
            dispatch(getCommentDetailSuccess(comments));
        })
        .catch(err => {
            dispatch(getCommentDetailFail());
        })
    }
}

const createCommentStart = () => {
  return {
    type: CREATE_INQUIRY_COMMENT_START
  };
};

const createCommentSuccess = comment => {
  return {
    type: CREATE_INQUIRY_COMMENT_SUCCESS,
    comment
  };
};

const createCommentFail = error => {
  return {
    type: CREATE_INQUIRY_COMMENT_FAIL,
    error: error
  };
};

export const createComment = (token, data) => {
    return dispatch => {
        dispatch(createCommentStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(inquiryCreateCommentURL(data), data)
        .then(res => {
            
            dispatch(createCommentSuccess());
        })
        .catch(err => {
            dispatch(createCommentFail());
        })
    }
}

const updateCommentStart = () => {
  return {
    type: PUT_INQUIRY_COMMENT_START
  };
};

const updateCommentSuccess = comment => {
  return {
    type: PUT_INQUIRY_COMMENT_SUCCESS,
    comment
  };
};

const updateCommentFail = error => {
  return {
    type: PUT_INQUIRY_COMMENT_FAIL,
    error: error
  };
};

export const updateComment = (token, data) => {
    return dispatch => {
        dispatch(updateCommentStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(inquiryUpdateCommentURL(data), data)
        .then(res => {
            
            dispatch(updateCommentSuccess());
        })
        .catch(err => {
            dispatch(updateCommentFail());
        })
    }
}