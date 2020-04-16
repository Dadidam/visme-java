import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "containers/NotFound";
import Signup from "containers/Signup";
import Home from "containers/Home";
import ProjectAdd from "components/Project/ProjectAdd";

export default ({ history }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/project/add" exact component={ProjectAdd} history={history} />

    {/* 404 page */}
    <Route component={NotFound} />
  </Switch>
);
