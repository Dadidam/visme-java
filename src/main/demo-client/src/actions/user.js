// import axios from "axios";
import restClient from "helpers/restClient";
import * as userActions from "actions/types";

const apiUrl = "http://localhost:8080/api/v1";

// check user credentials via server API
export const authUser = (userCredentials) => async (dispatch) => {
  try {
    // reset an error
    dispatch({
      type: userActions.AUTH_ERROR,
      payload: false,
    });

    const url = `${apiUrl}/user/auth`;
    const response = await restClient.post(url, userCredentials);
    const payload = response.data;

    // add user to redux storage
    dispatch({
      type: userActions.AUTH_USER,
      payload,
    });

    return response;
  } catch (e) {
    // display an error at the login form
    dispatch({
      type: userActions.AUTH_ERROR,
      payload: true,
    });

    return Promise.reject(e);
  }
};

// log user off
export function logoutUser() {
  return {
    type: userActions.LOGOUT_USER,
  };
}

// signup user via server API
export const signupUser = (userCredentials) => async (dispatch) => {
  try {
    // reset an error
    dispatch({
      type: userActions.SIGNUP_ERROR,
      payload: false,
    });

    const url = `${apiUrl}/user`;
    const response = await restClient.post(url, userCredentials);
    const payload = response.data;

    // add user to redux storage
    dispatch({
      type: userActions.AUTH_USER,
      payload,
    });

    return response;
  } catch (e) {
    // display an error at the login form
    dispatch({
      type: userActions.SIGNUP_ERROR,
      payload: true,
    });

    return Promise.reject(e);
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const url = `${apiUrl}/user`;
    const response = await restClient.get(url);
    const payload = response.data;

    // add users to redux storage
    dispatch({
      type: userActions.FETCH_USER_LIST,
      payload,
    });

    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};

// delete user from server
export const deleteUser = (userId) => async (dispatch) => {
  try {
    const url = `${apiUrl}/user/${userId}`;
    const response = await restClient.delete(url);

    // remove user from redux storage
    dispatch({
      type: userActions.DELETE_USER,
      payload: userId,
    });

    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};
