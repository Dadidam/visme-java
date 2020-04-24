import { combineReducers } from "redux";
import app from "reducers/app";
import project from "reducers/project";
import user from "reducers/user";

export default combineReducers({
  app,
  project,
  user,
});
