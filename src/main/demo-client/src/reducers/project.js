import _ from "lodash";
import * as actions from "actions/types";

const toggleType = (action, state) => {
  const projectId = action.payload;
  const projectEntry = _.find(state.list, { id: projectId });

  projectEntry.type = !projectEntry.type;

  return { ...state };
};

export default function (state = { current: null, list: [] }, action) {
  switch (action.type) {
    case actions.ADD_PROJECT:
      return { ...state, list: [...state.list, action.payload] };
    case actions.ADD_PROJECT_ERROR:
      return { ...state, addProjectError: action.payload };
    case actions.FETCH_USER_PROJECTS:
    case actions.FETCH_PROJECT_LIST:
      const { list, pagination } = action.payload;
      return { ...state, list, pagination };
    case actions.DELETE_PROJECT:
      const deletedId = action.payload;
      const filteredList = _.filter(
        state.list,
        (project) => project.id !== deletedId
      );
      return { ...state, list: filteredList };
    case actions.TOGGLE_PROJECT_TYPE:
      return toggleType(action, state);
    default:
      return state;
  }
}
