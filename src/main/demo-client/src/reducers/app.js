import * as actions from "actions/types";

const setProjectPager = (action, state) => {
  const projectPager = { ...state.projectPager, page: action.payload };
  return { ...state, projectPager };
};

const setProjectStart = (action, state) => {
  const projectPager = { ...state.projectPager, start: action.payload };
  return { ...state, projectPager };
};

const setProjectSize = (action, state) => {
  const projectPager = { ...state.projectPager, size: action.payload };
  return { ...state, projectPager };
};

export default function (state = null, action) {
  switch (action.type) {
    case actions.CONNECTION_FAILED:
      return { ...state, connectionFailed: action.payload };
    case actions.CHANGE_PROJECT_PAGER_PAGE:
      return setProjectPager(action, state);
    case actions.CHANGE_PROJECT_PAGER_START:
      return setProjectStart(action, state);
    case actions.CHANGE_PROJECT_PAGER_SIZE:
      return setProjectSize(action, state);
    default:
      return state;
  }
}
