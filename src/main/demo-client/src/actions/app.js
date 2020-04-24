import * as actions from "actions/types";

export function setConnectionError(isFailed = true) {
  return {
    type: actions.CONNECTION_FAILED,
    payload: isFailed,
  };
}
