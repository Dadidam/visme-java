import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "containers/NotFound";
import Signup from "containers/Signup";
import UserList from "components/UserManagement/index";
import ProjectAdd from "components/Project/ProjectAdd";

export default ({ history }) => (
  <Switch>
    <Route path="/" exact component={UserList} />
    <Route path="/user/add" exact component={Signup} />
    <Route path="/project/add" exact component={ProjectAdd} history={history} />

    {/* 404 page */}
    <Route component={NotFound} />
  </Switch>
);
