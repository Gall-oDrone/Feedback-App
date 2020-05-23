import axios from "axios";
import { 
  ADD_NOTIFICATION,
  SET_NOTIFICATIONS,
  SET_UNVIEWS,
  SET_STATUS,
  GET_NTFNS_SUCCESS
} from "./actionTypes";
import {
  notificationListScrollerURL,
} from "../../constants"

import { HOST_URL } from "../../settings";

export const addMessage = message => {
  return {
    type: ADD_NOTIFICATION,
    message: message
  };
};

export const setMessages = messages => {
  return {
    type: SET_NOTIFICATIONS,
    messages: messages.messages,
    hasMore: messages.hasMore,
  };
};

export const setUnviews = unviews => {
  return {
    type: SET_UNVIEWS,
    unview: unviews.unview,
  };
};

// const getProfileNotificationListSuccess = data => {
//   console.log("2) Actions getMeetingDetailSuccess")
//   return {
//     type: GET_PROFILE_NOTIFICATIONS_LIST_SUCCESS ,
//     data
//   };
// };

// const getProfileNotificationListFail = error => {
//   return {
//     type: GET_PROFILE_NOTIFICATIONS_LIST_FAIL,
//     error: error
//   };
// };

// export const getProfileNotificationList = (token, username, limit, offset) => {
//     return dispatch => {
//       console.log(" getProfileNotificationList ")
//         axios.defaults.headers = {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`
//         }
//         axios.get(notificationListScrollerURL(username, limit, offset))
//         .then(res => {
//             const data = res.data;
//             console.log("data: "+ JSON.stringify(data))
//             dispatch(getProfileNotificationListSuccess(data));
//         })
//         .catch(err => {
//             dispatch(getProfileNotificationListFail(err));
//         })
//     }
// }