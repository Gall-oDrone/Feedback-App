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
import Corso from "./components/iFrame"
// import Corso from "./components/VideoChatFrame"
import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentChoices from "./containers/AssignmentChoices";
import AssignmentCreate from "./containers/AssignmentCreate";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/create/" component={AssignmentChoices} />
    <Route exact path="/articles/" component={ArticleList} />
    <Route exact path="/peers/" component={PeerList} />
    <Route exact path="/corso/" component={Corso} />
    <Route exact path="/create-article/" component={ArticleCreate} />
    <Route exact path="/articles/update/" component={ArticleUpdate} />
    <Route exact path="/articles/:articleID/feedback/" component={ArticleFeedback} />
    <Route exact path="/articles/:articleID/rating/" component={ArticleRating} />
    <Route exact path="/articles/:articleID" component={ArticleDetail} />
    <Route exact path="/articles/detailmenu/:articleID" component={ArticleDetailMenu} />
    <Route exact path="/assignments/" component={AssignmentList} />
    <Route exact path="/assignments/:id" component={AssignmentDetail} />
    <Route exact path="/create/survey/" component={AssignmentCreate} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/profile/:id" component={Profile} />
  </Hoc>
);

export default BaseRouter;
