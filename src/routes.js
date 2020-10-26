import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Search from "./containers/SearchResults";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import Reconfirmation from "./containers/Reconfirmation";
import CredentialsModal from "./containers/CredentialsModal";

import ArticleList from "./containers/ArticleList";
import ArticleCreate from "./containers/ArticleCreate";
import ArticleFeedback from "./containers/ArticleFeedback";
import ArticleRating from "./containers/ArticleRating";
import ArticleUpdate from "./containers/ArticleUpdate";
import ArticleDetail from "./containers/ArticleDetail";
import ArticleDetailMenu from "./containers/ArticleDetailMenu";

import ProjectList from "./containers/ProjectList";
import ProjectCreate from "./containers/ProjectCreate";
import ProjectFeedback from "./containers/ProjectFeedback";
import ProjectRating from "./containers/ProjectRating";
import ProjectUpdate from "./containers/ProjectUpdate";
import ProjectDetail from "./containers/ProjectDetail";
import ProjectDetailMenu from "./containers/ProjectDetailMenu";
import ProjectDetailMenu2 from "./containers/ProjectDetailMenu2";

import PeerSlide from "./containers/Peers/PeerSlideShow"
import PeerList from "./containers/Peers/PeerList"
import PeerList2 from "./containers/Peers/PeerList2"
import PeerList3 from "./containers/Peers/PeerDetail"
import InquiryCreate from "./containers/InquiryCreate";
import InquiryList from "./containers/InquiryList";

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
import ProfileAccountProjectList from "./components/ProfileProjectList"
import ProfileAccountProjectDetail from "./components/ProfileProjectDetail"
import ProfileAccountInquiryList from "./components/ProfileInquiryList"
import ProfileAccountInquiryDetail from "./components/ProfileInquiryDetail"
import ProfileAccountSessionList from "./components/ProfileSessionList"
import ProfileAccountSessionDetail from "./components/ProfileSessionDetail"
import ProfileSurveyMenu from "./components/ProfileSurveyMenu"
import ProfileAccountIncentiveList from "./containers/ProfileAccountIncentives"
import ProfilePage from "./containers/ProfilePage"

import Calendar from "./components/Calendar"

import SurveyList from "./containers/SurveyList";
import SurveyDetail from "./containers/SurveyDetail";
import SurveyChoices from "./containers/SurveyChoices";
import SurveyCreate from "./containers/SurveyCreate";
import SurveyQuestions from "./containers/SurveyQuestions";
import ProfileSurveyList from "./components/ProfileSurveyList";
import ProfileSurveyDetail from "./components/ProfileSurveyDetail";

import Checkout from "./containers/InjectedCheckoutForm";
import DonationCheckout from "./containers/InjectedDonationCheckoutForm";
import OrderSummary from "./containers/OrderSummary";

import ChatApp from "./chat_containers/chatApp";
import Chat from "./chat_containers/Chat";
import VideoChat from "./chat_containers/Video7"
import Video from "./chat_containers/Video7"

import Address from "./containers/ProfileAddress";
import AddressForm from "./containers/AddressForm";

import Payment from "./containers/ProfilePaymentHistory";
import PaymentForm from "./containers/PaymentHistory";

import Wallet from "./containers/TransferMain";
import PeerSlideShow from "./containers/Peers/PeerSlideShow";

import SessionList from "./containers/SessionList";
import SessionCreate from "./containers/SessionCreate";
import SessionDetail from "./containers/SessionDetail";
import SessionRoomMenu from "./containers/SessionRoomMenu2";

import WorkshopList from "./containers/WorkshopList";
import WorkshopCreate from "./containers/WorkshopCreate";
// import WorkshopFeedback from "./containers/WorkshopFeedback";
// import WorkshopRating from "./containers/WorkshopRating";
// import WorkshopUpdate from "./containers/WorkshopUpdate";
import WorkshopDetail from "./containers/WorkshopDetail";
// import WorkshopDetailMenu from "./containers/WorkshopDetailMenu";

import ProjectManagement from "./tello-src/components/Home"
import TrelloBoard from "./tello-src/components/TrelloBoard"

import CollaborationList from "./containers/CollaborationList";
import CollaborationCreate from "./containers/CollaborationCreate";
import CollaborationDetail from "./containers/CollaborationDetail";
import ProfileCollaborations from "./containers/ProfileCollaborations"

// const BaseRouter2 = () => (
//   <Hoc>
//     <Route exact path="/"/>
//   </Hoc>
//   );
//   export default BaseRouter2;

const BaseRouter = () => (
  <Hoc>

    <Route exact path="/search/:searchValue" component={Search} />
    <Route exact path="/create/" component={AssignmentChoices} />
    <Route exact path="/articles/" component={ArticleList} />

    <Route exact path="/peerSlide/" component={PeerSlideShow} />
    <Route exact path="/peers/" component={PeerList} />
    <Route exact path="/peers2/" component={PeerList2} />
    <Route exact path="/peers3/" component={PeerList3} />
    <Route exact path="/create-inquiry/" component={InquiryCreate} />
    <Route exact path="/inquiries/" component={InquiryList} />

    <Route exact path="/frameTest/:roomID" component={RoomMenu} />
    <Route exact path="/create-article/" component={ArticleCreate} />
    <Route exact path="/articles/update/" component={ArticleUpdate} />
    <Route exact path="/articles/:articleID/feedback/" component={ArticleFeedback} />
    <Route exact path="/articles/:articleID/rating/" component={ArticleRating} />
    <Route exact path="/articles/:articleID" component={ArticleDetail} />
    <Route exact path="/articles/detailmenu/:articleID" component={ArticleDetailMenu} />

    <Route exact path="/projects/" component={ProjectList} />
    <Route exact path="/create-project/" component={ProjectCreate} />
    <Route exact path="/projects/update/" component={ProjectUpdate} />
    <Route exact path="/projects/:projectID/feedback/" component={ProjectFeedback} />
    <Route exact path="/projects/:projectID/rating/" component={ProjectRating} />
    <Route exact path="/projects/:projectID" component={ProjectDetail} />
    <Route exact path="/projects/detailmenu/:projectID" component={ProjectDetailMenu} />
    <Route exact path="/projects/detailmenu2/:projectID" component={ProjectDetailMenu2} />

    <Route exact path="/assignments/" component={AssignmentList} />
    <Route exact path="/assignments/:id" component={AssignmentDetail} />
    <Route exact path="/create/assignment/" component={AssignmentCreate} />
    <Route exact path="/meeting/" component={Meeting} />
    <Route exact path="/meetingReview2/" component={MeetingReviewP} />

    <Route exact path="/login/" component={Login} />
    <Route exact path="/login/:uid/:token/" component={Login} />
    <Route exact path="/confirmation/new/" component={Reconfirmation} />
    <Route exact path="/signup/" component={Signup} />
    
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/profile/:id/menu/" component={ProfileMainMenu} />
    <Route exact path="/userProfile/" component={MeetingReview} />
    <Route exact path="/profile-page/:user" component={ProfilePage} />
    <Route exact path="/profile/:id/meetings/" component={ProfileMeetings} />

    <Route exact path="/profile/:id/account/info/" component={ProfileAccountInfo} />
    <Route exact path="/profile/:id/account/user/info/" component={ProfileAccountUserInfo} />
    <Route exact path="/profile/:id/account/user/resume/" component={CredentialsModal} />
    <Route exact path="/profile/:id/account/articles/list/" component={ProfileAccountArticleList} />
    <Route exact path="/profile/:id/account/articles/detail/:articleID" component={ProfileAccountArticleDetail} />

    <Route exact path="/profile/:id/account/projects/list/" component={ProfileAccountProjectList} />
    <Route exact path="/profile/:id/account/projects/detail/:projectID" component={ProfileAccountProjectDetail} />

    <Route exact path="/profile/:id/account/inquiries/list/" component={ProfileAccountInquiryList} />
    <Route exact path="/profile/:id/account/inquiries/detail/:inquiryID" component={ProfileAccountInquiryDetail} />
    <Route exact path="/profile/:id/account/sessions/list/" component={ProfileAccountSessionList} />
    <Route exact path="/profile/:id/account/sessions/detail/:sessionID" component={ProfileAccountSessionDetail} />
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

    <Route exact path="/order-summary/" component={OrderSummary} />
    <Route exact path="/checkout/" component={Checkout} />
    <Route exact path="/donation-checkout/" component={DonationCheckout} />
    <Route exact path="/checkout/giftCard/:brand/:amount/:country/:currency/" component={Checkout} />
    <Route exact path="/checkout/booking/:user/:amount/:country/:currency/" component={Checkout} />

    <Route exact path="/chat/" component={ChatApp} />
    <Route exact path="/chat/:chatID/" component={ChatApp} />
    <Route exact path="/video-chat/" component={VideoChat} />
    <Route exact path="/video-chat-test/" component={Video} />
    <Route exact path="/video-chat/:roomID" component={VideoChat} />

    <Route exact path="/address/" component={Address} />
    <Route exact path="/address-form/" component={AddressForm} />

    <Route exact path="/payments/" component={Payment} />
    <Route exact path="/payment-form/" component={PaymentForm} />

    <Route exact path="/wallet/" component={Wallet} />

    <Route exact path="/create-session/" component={SessionCreate} />
    <Route exact path="/sessions/:sessionID" component={SessionDetail} />
    <Route exact path="/sessions/" component={SessionList} />
    <Route exact path="/sessionFrameTest/:roomID" component={SessionRoomMenu} />

    <Route exact path="/create-workshop/" component={WorkshopCreate} />
    <Route exact path="/workshops/" component={WorkshopList} />
    {/* <Route exact path="/workshops/update/" component={WorkshopUpdate} /> */}
    {/* <Route exact path="/workshops/:workshopID/feedback/" component={WorkshopFeedback} /> */}
    {/* <Route exact path="/workshops/:workshopID/rating/" component={WorkshopRating} /> */}
    <Route exact path="/workshops/:workshopID" component={WorkshopDetail} />
    {/* <Route exact path="/workshops/detailmenu/:workshopID" component={WorkshopDetailMenu} /> */}

    <Route exact path="/project-management/" component= {ProjectManagement} />
    <Route path="/project-management/:boardID" component={TrelloBoard} />

    <Route exact path="/create-collaboration/" component={CollaborationCreate} />
    <Route exact path="/collaboration/:collabID" component={CollaborationDetail} />
    <Route exact path="/collaborations/" component={CollaborationList} />
    <Route exact path="/profile/:id/collaborations/" component={ProfileCollaborations} />

  </Hoc>
);

export default BaseRouter;
