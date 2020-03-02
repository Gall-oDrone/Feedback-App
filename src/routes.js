import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import ArticleList from "./containers/ArticleList";
import ArticleCreate from "./containers/ArticleCreate";
import ArticleFeedback from "./containers/ArticleFeedback";
import ArticleRating from "./containers/ArticleRating";
import ArticleUpdate from "./containers/ArticleUpdate";
import ArticleDetail from "./containers/ArticleDetail";
import ArticleDetailMenu from "./containers/ArticleDetailMenu";

import PeerList from "./containers/Peers/PeerList"
import PeerList2 from "./containers/Peers/PeerList2"
import PeerList3 from "./containers/Peers/PeerDetail"
import InquiryCreate from "./containers/InquiryCreate";

import Test from "./components/test"
// import Corso from "./components/VideoChatFrame"
import Meeting from "./components/MeetingSteps"
import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentChoices from "./containers/AssignmentChoices";
import AssignmentCreate from "./containers/AssignmentCreate";
import Meetings from "./components/MeetingSteps"
import ProfileMeetings from "./containers/ProfileMeetings"
import ProfileInfo from "./components/UserProfileInfo"
import ProfileMainMenu from "./containers/ProfileMainMenu"
import RoomMenu from "./containers/RoomMenu"
import IncentiveList from "./containers/IncentiveList";
import MeetingReview from "./components/MeetingReview"
import MeetingReviewP from "./containers/MeetingParticipantSelector"
import ProfileAccountInfo from "./components/ProfileAccountInfo"
import ProfileAccountUserInfo from "./components/ProfileAccountUserInfo"
import ProfileAccountArticleList from "./components/ProfileArticleList"
import ProfileAccountArticleDetail from "./components/ProfileArticleDetail"
import ProfileSurveyMenu from "./components/ProfileSurveyMenu"
import ProfileAccountIncentiveList from "./containers/ProfileAccountIncentives"
import Calendar from "./components/Calendar"

import SurveyList from "./containers/SurveyList";
import SurveyDetail from "./containers/SurveyDetail";
import SurveyChoices from "./containers/SurveyChoices";
import SurveyCreate from "./containers/SurveyCreate";
import SurveyQuestions from "./containers/SurveyQuestions";
import ProfileSurveyList from "./components/ProfileSurveyList"
import ProfileSurveyDetail from "./components/ProfileSurveyDetail"

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/create/" component={AssignmentChoices} />
    <Route exact path="/articles/" component={ArticleList} />

    <Route exact path="/peers/" component={PeerList} />
    <Route exact path="/peers2/" component={PeerList2} />
    <Route exact path="/peers3/" component={PeerList3} />
    <Route exact path="/create-inquiry/" component={InquiryCreate} />

    <Route exact path="/frameTest/:roomID" component={Test} />
    <Route exact path="/create-article/" component={ArticleCreate} />
    <Route exact path="/articles/update/" component={ArticleUpdate} />
    <Route exact path="/articles/:articleID/feedback/" component={ArticleFeedback} />
    <Route exact path="/articles/:articleID/rating/" component={ArticleRating} />
    <Route exact path="/articles/:articleID" component={ArticleDetail} />
    <Route exact path="/articles/detailmenu/:articleID" component={ArticleDetailMenu} />
    <Route exact path="/assignments/" component={AssignmentList} />
    <Route exact path="/assignments/:id" component={AssignmentDetail} />
    <Route exact path="/create/assignment/" component={AssignmentCreate} />
    <Route exact path="/meeting/" component={Meeting} />
    <Route exact path="/meetingReview2/" component={MeetingReviewP} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/profile/:id/menu/" component={ProfileMainMenu} />
    <Route exact path="/userProfile/" component={MeetingReview} />
    <Route exact path="/profile/:id/meetings/" component={ProfileMeetings} />
    <Route exact path="/profile/:id/account/info/" component={ProfileAccountInfo} />
    <Route exact path="/profile/:id/account/user/info/" component={ProfileAccountUserInfo} />
    <Route exact path="/profile/:id/account/articles/list/" component={ProfileAccountArticleList} />
    <Route exact path="/profile/:id/account/articles/detail/:articleID" component={ProfileAccountArticleDetail} />
    <Route exact path="/profile/:id/account/incentives/list/" component={ProfileAccountIncentiveList} />
    <Route exact path="/incentives/" component={IncentiveList} />
    <Route exact path="/rm/" component={RoomMenu} />
    <Route exact path="/calendar/" component={Calendar} />

    <Route exact path="/survey/" component={SurveyList} />
    <Route exact path="/survey/detail/:id" component={SurveyDetail} />
    <Route exact path="/create/survey/" component={SurveyCreate} />
    <Route exact path="/create/" component={SurveyChoices} />
    <Route exact path="/survey/questions/" component={SurveyQuestions} />
    <Route exact path="/profile-survey/" component={ProfileSurveyMenu} />
    <Route exact path="/profile/:id/account/survey/list/" component={ProfileSurveyList} />
    <Route exact path="/profile/:id/account/survey/detail/:articleID" component={ProfileSurveyDetail} />
  </Hoc>
);

export default BaseRouter;
