import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import reducers from "reducers/index";

const store = createStore(reducers, applyMiddleware(ReduxPromise, reduxThunk));

export default store;
