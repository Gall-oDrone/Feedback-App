import axios from "axios";
import {
  GET_PROFILE_MR_START,
  GET_PROFILE_MR_FAIL,
  GET_PROFILE_MR_SUCCESS,
  GET_PROFILE_ARTICLE_LIST_START,
  GET_PROFILE_ARTICLES_LIST_FAIL,
  GET_PROFILE_ARTICLES_LIST_SUCCESS,
  GET_PROFILE_ARTICLE_DETAIL_START,
  GET_PROFILE_ARTICLE_DETAIL_FAIL,
  GET_PROFILE_ARTICLE_DETAIL_SUCCESS,
  PUT_PROFILE_ARTICLE_DETAIL_START,
  PUT_PROFILE_ARTICLE_DETAIL_FAIL,
  PUT_PROFILE_ARTICLE_DETAIL_SUCCESS
} from "./actionTypes";

const getProfileMeetingRequestsStart = () => {
  return {
    type: GET_PROFILE_MR_START
  };
};

const getProfileMeetingRequestsSuccess = meetingList => {
  return {
    type: GET_PROFILE_MR_SUCCESS,
    meetingList
  };
};

const getProfileMeetingRequestsFail = error => {
  return {
    type: GET_PROFILE_MR_FAIL,
    error: error
  };
};

export const getProfileMeetingRequests = (username, token) => {
  console.log(username)
  console.log(token)
  return dispatch => {
    dispatch(getProfileMeetingRequestsStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/users/lcrequest/${username}`)
      .then(res => {
        console.log("EHRENO")
        const meetingList = res.data;
        console.log("EHRENO 2")
        dispatch(getProfileMeetingRequestsSuccess(meetingList));
      })
      .catch(err => {
        dispatch(getProfileMeetingRequestsFail(err));
      });
  };
};

// const getMeetingDetailStart = () => {
//   console.log("1) Actions getMeetingDetailStart")
//   return {
//     type: GET_MEETING_DETAIL_START
//   };
// };

// const getMeetingDetailSuccess = data => {
//   console.log("2) Actions getMeetingDetailSuccess")
//   return {
//     type: GET_MEETING_DETAIL_SUCCESS,
//     data
//   };
// };

// const getMeetingDetailFail = error => {
//   return {
//     type: GET_MEETING_DETAIL_FAIL,
//     error: error
//   };
// };

// export const getDetailMeetingList = (token, articleID, userID) => {
//     return dispatch => {
//       console.log(" getDetailMeetingList ")
//       console.log(" token, articleID, userID: "+ token, articleID, userID)
//         // dispatch(getMeetingDetailStart());
//         axios.defaults.headers = {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`
//         }
//         axios.get(`http://127.0.0.1:8000/live-chat/lcrequest/listdetail/${articleID}/${userID}`)
//         .then(res => {
//             const data = res.data;
//             console.log("data: "+ JSON.stringify(data))
//             dispatch(getMeetingDetailSuccess(data));
//         })
//         .catch(err => {
//             dispatch(getMeetingDetailFail(err));
//         })
//     }
// }

const getProfileArticleListStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_ARTICLE_LIST_START
  };
};

const getProfileArticleListSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_ARTICLES_LIST_SUCCESS ,
    data
  };
};

const getProfileArticleListFail = error => {
  return {
    type: GET_PROFILE_ARTICLES_LIST_FAIL,
    error: error
  };
};

export const getProfileArticleList = (token, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/articles/list/${username}`)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileArticleListSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileArticleListFail(err));
        })
    }
}

const getProfileArticleDetailStart = () => {
  console.log("1) Actions getMeetingDetailStart")
  return {
    type: GET_PROFILE_ARTICLE_DETAIL_START
  };
};

const getProfileArticleDetailSuccess = data => {
  console.log("2) Actions getMeetingDetailSuccess")
  return {
    type: GET_PROFILE_ARTICLE_DETAIL_SUCCESS ,
    data
  };
};

const getProfileArticleDetailFail = error => {
  return {
    type: GET_PROFILE_ARTICLE_DETAIL_FAIL,
    error: error
  };
};

export const getProfileArticleDetail = (token, articleID, username) => {
    return dispatch => {
      console.log(" getDetailMeetingList ")
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/articles/${articleID}/detail/${username}`)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(getProfileArticleDetailSuccess(data));
        })
        .catch(err => {
            dispatch(getProfileArticleDetailFail(err));
        })
    }
}

const putProfileArticleDetailStart = () => {
  console.log("1) Actions putProfileArticleDetailStart")
  return {
    type: PUT_PROFILE_ARTICLE_DETAIL_START
  };
};

const putProfileArticleDetailSuccess = data => {
  console.log("2) Actions putProfileArticleDetailSuccess")
  return {
    type: PUT_PROFILE_ARTICLE_DETAIL_FAIL,
    data
  };
};

const putProfileArticleDetailFail = error => {
  return {
    type: PUT_PROFILE_ARTICLE_DETAIL_SUCCESS,
    error: error
  };
};

export const putProfileArticleDetail = (token, articleID, username, data) => {
    return dispatch => {
      console.log(" putProfileArticleDetail ")
      console.log(" putProfileArticleDetail data: "+JSON.stringify(data))
        // dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
          //'Accept': 'application/json, application/pdf, application/xml, text/plain, text/html, *.*',
          'content-type': 'multipart/form-data',
            // "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.put(`http://127.0.0.1:8000/articles/${articleID}/detail/${username}/`, data)
        .then(res => {
            const data = res.data;
            console.log("data: "+ JSON.stringify(data))
            dispatch(putProfileArticleDetailSuccess(data));
        })
        .catch(err => {
            dispatch(putProfileArticleDetailFail(err));
        })
    }
}