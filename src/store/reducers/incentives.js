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
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  error: null
};

const getUserIncentiveListStart = (state, action) => {
  console.log("1) Reducers getIncentiveListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserIncentiveListSuccess = (state, action) => {
  console.log("2) Reducers getIncentiveListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    UserIncentives: action.userIncentiveList,
    error: null,
    loading: false
  });
};

const getUserIncentiveListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUserReceivedIncentiveListStart = (state, action) => {
  console.log("1) Reducers getIncentiveListStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserReceivedIncentiveListSuccess = (state, action) => {
  console.log("2) Reducers getIncentiveListSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    ReceivedIncentiveList: action.meetingList,
    error: null,
    loading: false
  });
};

const getUserReceivedIncentiveListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getIncentiveDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getIncentiveDetailSuccess = (state, action) => {
  console.log("2) Reducers getIncentiveDetailSuccess")
  console.log(JSON.stringify(action))
  return updateObject(state, {
    // currentArticle: action.article,
    userIncentives: action.data,
    error: null,
    loading: false
  });
};

const getIncentiveDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createIncentiveStart = (state, action) => {
  console.log("1) Reducers createIncentiveStart")
  console.log("1.1) Reducers actions: " + JSON.stringify(action))
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createIncentiveSuccess = (state, action) => {
  console.log("2) Reducers createIncentiveSuccess")
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createIncentiveFail = (state, action) => {
  console.log("3) Reducers createIncentiveFail")
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_INCENTIVE_START:
      return createIncentiveStart(state, action);
    case CREATE_INCENTIVE_SUCCESS:
      return createIncentiveSuccess(state, action);
    case CREATE_INCENTIVE_FAIL:
      return createIncentiveFail(state, action);
    case GET_INCENTIVE_LIST_START:
      return getUserIncentiveListStart(state, action);
    case GET_INCENTIVE_LIST_SUCCESS:
      return getUserIncentiveListSuccess(state, action);
    case GET_INCENTIVE_LIST_FAIL:
      return getUserIncentiveListFail(state, action);
    case GET_INCENTIVE_DETAIL_SUCCESS:
      return getIncentiveDetailSuccess(state, action);
    case GET_INCENTIVE_DETAIL_FAIL:
      return getIncentiveDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;