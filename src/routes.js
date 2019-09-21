import React from "react";
import { Route } from "react-router-dom";

import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
// import Comentarios from "./components/Comment"
import { Layout } from "antd";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={ArticleList} />{" "}
    <Route exact path="/articles/:articleID/" component={ArticleDetail} />{" "}
    {/* <Route exact path="/comments/" component={Comentarios} />{" "} */}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
    <Route exact path="/user/" component={Layout} />{" "}
    <Route exact path="/feedback/" component={Layout} />{" "}
    <Route exact path="/survey/" component={ArticleDetail} />{" "}
  </div>
);

export default BaseRouter;
