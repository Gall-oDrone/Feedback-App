import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import assignmentReducer from "./store/reducers/assignments";
import inquiryReducer from "./store/reducers/inquiry"
import surveyReducer from "./store/reducers/survey";
import surveyChoiceReduce from "./store/reducers/surveyChoices";
import gradedSurveyReducer from "./store/reducers/gradedSurvey";
import assignmentChoiceReduce from "./store/reducers/assignmentsChoices";
import gradedAssignmentReducer from "./store/reducers/gradedAssignments";
import likeReducer from "./store/reducers/likes"
import ratingReducer from "./store/reducers/rating"
import commentReducer from "./store/reducers/comments"
import inquiryCommentReducer from "./store/reducers/inquiryComments"
import meetingsReducer from "./store/reducers/meetings"
import incetivesReducer from "./store/reducers/incentives"
import reviewMeetingReducer from "./store/reducers/reviewMeetings"
import profileReducer from "./store/reducers/profile"
import profileInfoReducer from "./store/reducers/profileUserInfo"
import profileInquiryReducer from "./store/reducers/profileInquiry"
import profileSurveyReducer from "./store/reducers/profileSurvey"
import dailyRoomReducer from "./store/reducers/dailyRooms"
import profileUserInfoReducer from "./store/reducers/profileAccountUserInfo"
import profileAccountDetailReducer from "./store/reducers/profileAccountInfo"
import profileNTFNListReducer from "./store/reducers/profileNTFN"


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  // assignments: assignmentReducer,
  // gradedAssignments: gradedAssignmentReducer,
  // assignmentsChoices: assignmentChoiceReduce,
  like: likeReducer,
  rating: ratingReducer,
  comments: commentReducer,
  inquiry_comments: inquiryCommentReducer,
  meetings: meetingsReducer,
  profile: profileReducer,
  profileInfo: profileInfoReducer,
  incentives: incetivesReducer,
  inquiry : inquiryReducer,
  roomDetail: dailyRoomReducer,
  profileUserInfo: profileUserInfoReducer,
  profileAccountInfo: profileAccountDetailReducer,
  reviewMeeting: reviewMeetingReducer,
  survey: surveyReducer,
  gradedSurvey: gradedSurveyReducer,
  // surveyChoices: surveyChoiceReduce,
  profileSurvey: profileSurveyReducer,
  profileNTFN: profileNTFNListReducer,
  profileInquiry: profileInquiryReducer

});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

