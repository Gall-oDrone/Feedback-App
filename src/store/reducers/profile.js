import {
  GET_PROFILE_DETAIL_START,
  GET_PROFILE_DETAIL_FAIL,
  GET_PROFILE_DETAIL_SUCCESS,
  GET_PROFILE_MR_START,
  GET_PROFILE_MR_FAIL,
  GET_PROFILE_MR_SUCCESS,
  PUT_MEETING_START,
  PUT_MEETING_FAIL,
  PUT_MEETING_SUCCESS,
  GET_PROFILE_ARTICLE_LIST_START,
  GET_PROFILE_ARTICLES_LIST_FAIL,
  GET_PROFILE_ARTICLES_LIST_SUCCESS,
  GET_PROFILE_ARTICLE_DETAIL_START,
  GET_PROFILE_ARTICLE_DETAIL_FAIL,
  GET_PROFILE_ARTICLE_DETAIL_SUCCESS,
  PUT_PROFILE_ARTICLE_DETAIL_START,
  PUT_PROFILE_ARTICLE_DETAIL_FAIL,
  PUT_PROFILE_ARTICLE_DETAIL_SUCCESS,
  DELETE_PROFILE_ARTICLE_DETAIL_SUCCESS,
  DELETE_PROFILE_ARTICLE_DETAIL_FAIL,
  GET_PROFILE_INQUIRIES_LIST_FAIL,
  GET_PROFILE_INQUIRIES_LIST_SUCCESS,
  GET_PROFILE_INQUIRY_DETAIL_FAIL,
  GET_PROFILE_INQUIRY_DETAIL_SUCCESS,
  PUT_PROFILE_INQUIRY_DETAIL_FAIL,
  PUT_PROFILE_INQUIRY_DETAIL_SUCCESS,
  DELETE_PROFILE_INQUIRY_DETAIL_FAIL,
  DELETE_PROFILE_INQUIRY_DETAIL_SUCCESS,
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false
};

const getProfileMRStart = (state, action) => {
  console.log("1) Reducers getMeetingListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileMRSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    ProfileMR: action.meetingList,
    error: null,
    loading: false
  });
};

const getProfileMRFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getMeetingDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getMeetingDetailSuccess = (state, action) => {
  console.log("2) Reducers getMeetingDetailSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    // currentArticle: action.article,
    UserMeetingDetails: action.data,
    error: null,
    loading: false
  });
};

const getMeetingDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createMeetingStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createMeetingSuccess = (state, action) => {
  console.log("2) Reducers createMeetingSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createMeetingFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putMeetingSuccess = (state, action) => {
  console.log("2) Reducers getMeetingListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    commentData: action.data,
    error: null,
    loading: false
  });
};

const putMeetingFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileArticleListStart = (state, action) => {
  console.log("1) Reducers createMeetingStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileArticleListSuccess = (state, action) => {
  console.log("2) Reducers getProfileArticleListSuccess")
  return updateObject(state, {
    articleList: action.data,
    error: null,
    loading: false
  });
};

const getProfileArticleListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileArticleDetailStart = (state, action) => {
  console.log("1) Reducers getProfileArticleDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProfileArticleDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileArticleDetailSuccess")
  return updateObject(state, {
    articleDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileArticleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const putProfileArticleDetailStart = (state, action) => {
  console.log("1) Reducers putProfileArticleDetailStart")
  console.log("1.1) Reducers actions: "+ JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const putProfileArticleDetailSuccess = (state, action) => {
  console.log("2) Reducers putProfileArticleDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const putProfileArticleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteProfileArticleDetailSuccess = (state, action) => {
  console.log("2) Reducers deleteProfileArticleDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const deleteProfileArticleDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileInquiryListSuccess = (state, action) => {
  console.log("2) Reducers getProfileInquiryListSuccess")
  return updateObject(state, {
    articleList: action.data,
    error: null,
    loading: false
  });
};

const getProfileInquiryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getProfileInquiryDetailSuccess = (state, action) => {
  console.log("2) Reducers getProfileInquiryDetailSuccess")
  return updateObject(state, {
    articleDetail: action.data,
    error: null,
    loading: false
  });
};

const getProfileInquiryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteProfileInquiryDetailSuccess = (state, action) => {
  console.log("2) Reducers deleteProfileInquiryDetailSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const deleteProfileInquiryDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_MR_START:
      return getProfileMRStart(state, action);
    case GET_PROFILE_MR_FAIL:
      return getProfileMRSuccess(state, action);
    case GET_PROFILE_MR_SUCCESS:
      return getProfileMRFail(state, action);
    case GET_PROFILE_ARTICLE_LIST_START:
      return getProfileArticleListStart(state, action);
    case GET_PROFILE_ARTICLES_LIST_FAIL:
      return getProfileArticleListFail(state, action);
    case GET_PROFILE_ARTICLES_LIST_SUCCESS:
      return getProfileArticleListSuccess(state, action);
    case GET_PROFILE_ARTICLE_DETAIL_START:
      return getProfileArticleDetailStart(state, action);
    case GET_PROFILE_ARTICLE_DETAIL_FAIL:
      return getProfileArticleDetailFail(state, action);
    case GET_PROFILE_ARTICLE_DETAIL_SUCCESS:
      return getProfileArticleDetailSuccess(state, action);
    case PUT_PROFILE_ARTICLE_DETAIL_START:
      return putProfileArticleDetailStart(state, action);
    case PUT_PROFILE_ARTICLE_DETAIL_FAIL:
      return putProfileArticleDetailFail(state, action);
    case PUT_PROFILE_ARTICLE_DETAIL_SUCCESS:
      return putProfileArticleDetailSuccess(state, action);
    case DELETE_PROFILE_ARTICLE_DETAIL_SUCCESS:
      return deleteProfileArticleDetailSuccess(state, action);
    case DELETE_PROFILE_ARTICLE_DETAIL_FAIL:
      return deleteProfileArticleDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;