import axios from "axios";
import {
    GET_PROJECT_COMMENT_LIST_START,
    GET_PROJECT_COMMENTS_LIST_FAIL,
    GET_PROJECT_COMMENTS_LIST_SUCCESS,
    CREATE_PROJECT_COMMENT_START,
    CREATE_PROJECT_COMMENT_FAIL,
    CREATE_PROJECT_COMMENT_SUCCESS,
    GET_PROJECT_COMMENT_DETAIL_START,
    GET_PROJECT_COMMENT_DETAIL_FAIL,
    GET_PROJECT_COMMENT_DETAIL_SUCCESS,
    PUT_PROJECT_COMMENT_START,
    PUT_PROJECT_COMMENT_FAIL,
    PUT_PROJECT_COMMENT_SUCCESS
} from "./actionTypes";
// import projectCommentsURL from "../../constants"
import {
  projectCommentsURL,
  projectCommentURL,
  projectCreateCommentURL,
  projectUpdateCommentURL
} from "../../constants"

const getCommentListStart = () => {
  console.log("1) Actions getCommentListStart")
  return {
    type: GET_PROJECT_COMMENT_LIST_START
  };
};

const getCommentListSuccess = data => {
  console.log("2) Actions getCommentListSuccess")
  return {
    type: GET_PROJECT_COMMENTS_LIST_SUCCESS,
    data
  };
};

const getCommentListFail = error => {
  return {
    type: GET_PROJECT_COMMENTS_LIST_FAIL,
    error: error
  };
};

export const getComment = (projectID) => {
    return dispatch => {
      console.log(" getComment: ")
        // dispatch(getCommentListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${token}`
        }
        axios.get(projectCommentsURL(projectID))
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
    type: GET_PROJECT_COMMENT_DETAIL_START
  };
};

const getCommentDetailSuccess = comments => {
  return {
    type: GET_PROJECT_COMMENT_DETAIL_SUCCESS,
    comments
  };
};

const getCommentDetailFail = error => {
  return {
    type: GET_PROJECT_COMMENT_DETAIL_FAIL,
    error: error
  };
};

export const getCommentDetail = (token, projectID, commentID) => {
    return dispatch => {
        dispatch(getCommentDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            // Authorization: `Token ${token}`
        }
        axios.get(projectCommentURL(projectID, commentID))
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
    type: CREATE_PROJECT_COMMENT_START
  };
};

const createCommentSuccess = comment => {
  return {
    type: CREATE_PROJECT_COMMENT_SUCCESS,
    comment
  };
};

const createCommentFail = error => {
  return {
    type: CREATE_PROJECT_COMMENT_FAIL,
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
        axios.post(projectCreateCommentURL(data), data)
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
    type: PUT_PROJECT_COMMENT_START
  };
};

const updateCommentSuccess = comment => {
  return {
    type: PUT_PROJECT_COMMENT_SUCCESS,
    comment
  };
};

const updateCommentFail = error => {
  return {
    type: PUT_PROJECT_COMMENT_FAIL,
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
        axios.put(projectUpdateCommentURL(data), data)
        .then(res => {
            
            dispatch(updateCommentSuccess());
        })
        .catch(err => {
            dispatch(updateCommentFail());
        })
    }
}