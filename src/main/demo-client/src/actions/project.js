import axios from "axios";
import * as userActions from "actions/types";

const apiUrl = "http://localhost:8080/api/v1";

// create new project via API
export const addProject = (projectDetails, userId) => async dispatch => {
  try {
    // reset an error
    dispatch({
      type: userActions.ADD_PROJECT_ERROR,
      payload: false
    });

    // API requests also needs a userId to set a project owner
    const details = { ...projectDetails, userId };

    const url = `${apiUrl}/project`;
    const response = await axios.post(url, details);
    const payload = response.data;

    // add project to redux storage
    dispatch({
      type: userActions.ADD_PROJECT,
      payload
    });

    return response;
  } catch (e) {
    // display an error at the login form
    dispatch({
      type: userActions.ADD_PROJECT_ERROR,
      payload: true
    });

    return Promise.reject(e);
  }
};

// fetch user's project list
export const fetchUserProjects = userId => async dispatch => {
  try {
    const url = `${apiUrl}/project/user/${userId}`;
    const response = await axios.get(url);
    const payload = response.data;

    // add projects to redux storage
    dispatch({
      type: userActions.FETCH_USER_PROJECTS,
      payload
    });

    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};

// delete project from server
export const deleteProject = projectId => async dispatch => {
  try {
    const url = `${apiUrl}/project/${projectId}`;
    const response = await axios.delete(url);

    // add project to redux storage
    dispatch({
      type: userActions.DELETE_PROJECT,
      payload: projectId
    });

    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
