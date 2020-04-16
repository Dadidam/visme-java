import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Home from "./containers/Home";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={Signup} />

    {/* 404 page */}
    <Route component={NotFound} />
  </Switch>
);
