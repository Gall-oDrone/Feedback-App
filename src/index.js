import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import assignmentReducer from "./store/reducers/assignments";
import assignmentChoiceReduce from "./store/reducers/assignmentsChoices";
import gradedAssignmentReducer from "./store/reducers/gradedAssignments";
import likeReducer from "./store/reducers/likes"
import ratingReducer from "./store/reducers/rating"
import commentReducer from "./store/reducers/comments"
import meetingsReducer from "./store/reducers/meetings"
import incetivesReducer from "./store/reducers/incentives"
import reviewMeetingReducer from "./store/reducers/reviewMeetings"
import profileReducer from "./store/reducers/profile"
import profileInfoReducer from "./store/reducers/profileUserInfo"
import dailyRoomReducer from "./store/reducers/dailyRooms"
import profileUserInfoReducer from "./store/reducers/profileAccountUserInfo"
import profileAccountDetailReducer from "./store/reducers/profileAccountInfo"

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  assignments: assignmentReducer,
  gradedAssignments: gradedAssignmentReducer,
  // assignmentsChoices: assignmentChoiceReduce,
  like: likeReducer,
  rating: ratingReducer,
  comments: commentReducer,
  meetings: meetingsReducer,
  profile: profileReducer,
  profileInfo: profileInfoReducer,
  incentives: incetivesReducer,
  roomDetail: dailyRoomReducer,
  profileUserInfo: profileUserInfoReducer,
  profileAccountInfo: profileAccountDetailReducer,
  reviewMeeting: reviewMeetingReducer,

});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

