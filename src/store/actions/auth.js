import axios from "axios";
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../actions/actionTypes';
import {
  authLogInURL,
  authSignUpURL,
  authLogOutURL,
  authGoogleLogInURL
} from "../../constants"

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  console.log("COÑO: ", error)
  window.location.reload(false);
  return {
    type: AUTH_FAIL,
    error: error
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem("user");
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  dispatch({ type: AUTH_LOGOUT});
};
  

  // localStorage.removeItem("user");
  // // window.location.reload(false);
  // return {
  //   type: AUTH_LOGOUT
  // };

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(authLogInURL, {
        username: username,
        password: password
      })
      .then(res => {
        console.log("authLogin res.data: ", res.data)
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_active: res.data.is_active,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          university: res.data.university.university,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authGoogleLogin = (token) => {
  return dispatch => {
    axios
      .post(authGoogleLogInURL, { access_token: token })
      .then(res => {
        console.log("authGoogleLogin res.data: ", res.data)
        const user = {
          token: res.data.key,
          username: res.data.username.username,
          userId: res.data.user,
          // is_active: res.data.user_type.is_active,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          university: res.data.university.university,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        console.log("authGoogleLogin user: ", JSON.stringify(user))
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
}

export const authSignup = (
  username,
  email,
  university,
  password1,
  password2,
  is_student
) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username,
      email,
      university,
      password1,
      password2,
      is_student,
      is_teacher: !is_student
    };
    axios
      .post(authSignUpURL, user)
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          university,
          userId: res.data.user,
          is_student,
          is_teacher: !is_student,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
