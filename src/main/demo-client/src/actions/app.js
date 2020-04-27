import * as actions from "actions/types";

export function setConnectionError(isFailed = true) {
  return {
    type: actions.CONNECTION_FAILED,
    payload: isFailed,
  };
}

export function changeProjectPagerPage(page = 1) {
  return {
    type: actions.CHANGE_PROJECT_PAGER_PAGE,
    payload: page,
  };
}

export function changeProjectPagerStart(start = 0) {
  return {
    type: actions.CHANGE_PROJECT_PAGER_START,
    payload: start,
  };
}

export function changeProjectPagerSize(size = 2) {
  return {
    type: actions.CHANGE_PROJECT_PAGER_SIZE,
    payload: size,
  };
}
