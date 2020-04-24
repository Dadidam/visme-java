import _ from "lodash";
import * as userAction from "actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case userAction.AUTH_USER:
      return { ...state, ...action.payload };
    case userAction.LOGOUT_USER:
      return null;
    case userAction.AUTH_ERROR:
      return { ...state, authError: action.payload };
    case userAction.SIGNUP_ERROR:
      return { ...state, signupError: action.payload };
    case userAction.FETCH_USER_LIST:
      return { ...state, list: action.payload };
    case userAction.DELETE_USER:
      const deletedId = action.payload;
      const list = _.filter(state.list, (user) => user.id !== deletedId);
      return { ...state, list };
    default:
      return state;
  }
}
