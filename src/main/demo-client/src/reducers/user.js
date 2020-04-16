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
    default:
      return state;
  }
}
