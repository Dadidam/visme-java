import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "containers/NotFound";
import Signup from "containers/Signup";
import UserList from "components/UserManagement/index";
import ProjectAdd from "components/Project/ProjectAdd";
import ProjectList from "components/Project/index";

export default ({ history }) => (
  <Switch>
    <Route path="/" exact component={UserList} history={history} />
    <Route path="/user/add" exact component={Signup} history={history} />
    <Route path="/projects" exact component={ProjectList} history={history} />
    <Route path="/project/add" exact component={ProjectAdd} history={history} />

    {/* 404 page */}
    <Route component={NotFound} />
  </Switch>
);
