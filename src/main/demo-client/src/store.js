import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import reducers from "reducers/index";

const appInitState = {
  connectionFailed: false,
  projectPager: {
    start: 0,
    size: 2,
    page: 1,
  },
  typeFilter: null,
};

const store = createStore(
  reducers,
  { app: appInitState },
  applyMiddleware(ReduxPromise, reduxThunk)
);

export default store;
