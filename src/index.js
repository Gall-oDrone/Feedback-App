import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ChatApp from "./chat_containers/chatApp";
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
import projectLikeReducer from "./store/reducers/projectLikes"
import ratingReducer from "./store/reducers/rating"
import projectCommentReducer from "./store/reducers/projectComments"
import commentReducer from "./store/reducers/comments"
import inquiryCommentReducer from "./store/reducers/inquiryComments"
import meetingsReducer from "./store/reducers/meetings"
import incetivesReducer from "./store/reducers/incentives"
import reviewMeetingReducer from "./store/reducers/reviewMeetings"
import sessionsReducer from "./store/reducers/sessions"
import profileReducer from "./store/reducers/profile"
import profileInfoReducer from "./store/reducers/profileUserInfo"
import profileInquiryReducer from "./store/reducers/profileInquiry"
import profileSurveyReducer from "./store/reducers/profileSurvey"
import dailyRoomReducer from "./store/reducers/dailyRooms"
import profileUserInfoReducer from "./store/reducers/profileAccountUserInfo"
import profileAccountDetailReducer from "./store/reducers/profileAccountInfo"
import profileNTFNListReducer from "./store/reducers/profileNTFN"
import profileMSGSListReducer from "./store/reducers/profileMSGS"

import navReducer from "./store/reducers/nav";
import messageReducer from "./store/reducers/message";
import notifyReducer from "./store/reducers/notification";

import listsReducer from "./tello-src/reducers/listsReducer";
import cardsReducer from "./tello-src/reducers/cardsReducer";
import boardsReducer from "./tello-src/reducers/boardsReducer";
import boardOrderReducer from "./tello-src/reducers/boardOrderReducer";
import activeBoardReducer from "./tello-src/reducers/activeBoardReducer";
import boardListReducer from "./tello-src/reducers/boardListReducer";
import collaborationReducer from "./store/reducers/collaborations";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  // assignments: assignmentReducer,
  // gradedAssignments: gradedAssignmentReducer,
  // assignmentsChoices: assignmentChoiceReduce,
  like: likeReducer,
  project_like: projectLikeReducer,
  rating: ratingReducer,
  comments: commentReducer,
  project_comments: projectCommentReducer,
  inquiry_comments: inquiryCommentReducer,
  meetings: meetingsReducer,
  profile: profileReducer,
  profileInfo: profileInfoReducer,
  incentives: incetivesReducer,
  inquiry : inquiryReducer,
  roomDetail: dailyRoomReducer,
  session: sessionsReducer,
  profileUserInfo: profileUserInfoReducer,
  profileAccountInfo: profileAccountDetailReducer,
  reviewMeeting: reviewMeetingReducer,
  survey: surveyReducer,
  gradedSurvey: gradedSurveyReducer,
  // surveyChoices: surveyChoiceReduce,
  profileSurvey: profileSurveyReducer,
  profileNTFN: profileNTFNListReducer,
  profileMSGS: profileMSGSListReducer,
  profileInquiry: profileInquiryReducer,

  nav: navReducer,
  message: messageReducer,
  notify: notifyReducer,

  lists: listsReducer,
  cards: cardsReducer,
  boards: boardsReducer,
  boardOrder: boardOrderReducer,
  activeBoard: activeBoardReducer,
  boardList: boardListReducer,
  collaboration: collaborationReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
    {/* <ChatApp /> */}
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

