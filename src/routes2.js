import React from "react";
import { Route, Redirect } from "react-router-dom";
import Hoc from "./hoc/hoc";

import LandingPage from "./containers/LandingPage";
import TeamPage from "./containers/TeamPage";
import ProductPage from "./containers/ProductPage";

const UnauthRouter = () => (
  <Hoc>
    {/* <Route exact path="/">
      <Redirect to="/product" />
    </Route> */}
    <Route exact path="/team/" component={TeamPage} />
    <Route exact path="/product/" component={ProductPage} />
    <Route exact path="/" component={ProductPage} />
  </Hoc>
);

export default UnauthRouter;
