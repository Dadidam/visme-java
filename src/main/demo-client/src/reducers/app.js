import * as actions from "actions/types";

export default function (state = { connectionFailed: false }, action) {
  switch (action.type) {
    case actions.CONNECTION_FAILED:
      return { ...state, connectionFailed: action.payload };
    default:
      return state;
  }
}
