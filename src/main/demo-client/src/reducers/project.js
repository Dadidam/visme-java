import _ from "lodash";
import * as userAction from "actions/types";

export default function (state = { current: null, list: [] }, action) {
  switch (action.type) {
    case userAction.ADD_PROJECT:
      return { ...state, list: [...state.list, ...action.payload] };
    case userAction.ADD_PROJECT_ERROR:
      return { ...state, addProjectError: action.payload };
    case userAction.FETCH_USER_PROJECTS:
      return { ...state, list: action.payload };
    case userAction.DELETE_PROJECT:
      const deletedId = action.payload;
      const list = _.filter(state.list, project => project.id !== deletedId);
      return { ...state, list };
    default:
      return state;
  }
}
