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
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  commentData: null,
  error: null,
  loading: false
};

const getCommentListStart = (state, action) => {
  console.log("1) Reducers getCommentListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCommentListSuccess = (state, action) => {
  console.log("2) Reducers getCommentListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    commentData: action.data,
    error: null,
    loading: false
  });
};

const getCommentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCommentDetailStart = (state, action) => {
  return updateObject(state, {
    commentData: action,
    error: null,
    loading: true
  });
};

const getCommentDetailSuccess = (state, action) => {
  return updateObject(state, {
    // currentArticle: action.article,
    comments: action,
    error: null,
    loading: false
  });
};

const getCommentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCommentStart = (state, action) => {
  console.log("1) Reducers createCommentStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCommentSuccess = (state, action) => {
  console.log("2) Reducers createCommentSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCommentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putCommentSuccess = (state, action) => {
  console.log("2) Reducers getCommentListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    commentData: action.data,
    error: null,
    loading: false
  });
};

const putCommentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_COMMENT_LIST_START:
      return getCommentListStart(state, action);
    case GET_PROJECT_COMMENTS_LIST_SUCCESS:
      return getCommentListSuccess(state, action);
    case GET_PROJECT_COMMENTS_LIST_FAIL:
      return getCommentListFail(state, action);
    case GET_PROJECT_COMMENT_DETAIL_START:
      return getCommentDetailStart(state, action);
    case GET_PROJECT_COMMENT_DETAIL_SUCCESS:
      return getCommentDetailSuccess(state, action);
    case GET_PROJECT_COMMENT_DETAIL_FAIL:
      return getCommentDetailFail(state, action);
    case CREATE_PROJECT_COMMENT_START:
      return createCommentStart(state, action);
    case CREATE_PROJECT_COMMENT_SUCCESS:
      return createCommentSuccess(state, action);
    case CREATE_PROJECT_COMMENT_FAIL:
      return createCommentFail(state, action);
    default:
      return state;
  }
};

export default reducer;
