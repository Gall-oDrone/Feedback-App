import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  username: null,
  university: null,
  is_active_user: null,
  is_student: null,
  is_teacher: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  console.log("authScess action: ", action, action.user)
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    university: action.user.university,
    is_active_user: action.user.is_active_user,
    is_student: action.user.is_student,
    is_teacher: action.user.is_teacher,
    userId: action.user.userId,
    error: null,
    loading: false
  });
};

const authSuccessTest = (state, action) => {
  console.log("authScess action: ", action, action.user)
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    is_active_user: action.user.is_active_user,
    has_profile_info: action.user.has_profile_info,
    is_student: action.user.is_student,
    is_teacher: action.user.is_teacher,
    userId: action.user.userId,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null,
    university: null,
    is_active_user: null,
    is_student: null,
    is_teacher: null,
    userId: null,

  });
};

const resendEmailSuccess = (state, action) => {
  console.log("resendEmailSuccess action: ", action)
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const resendEmailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.RESEND_EMAIL_SUCCESS:
      return resendEmailSuccess(state, action);
    case actionTypes.RESEND_EMAIL_FAIL:
      return resendEmailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
