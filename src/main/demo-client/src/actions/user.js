import axios from "axios";
import * as userActions from "actions/types";

const apiUrl = "http://localhost:8080/api/v1";

// check user credentials via server API
export const authUser = userCredentials => async dispatch => {
  try {
    // reset an error
    dispatch({
      type: userActions.AUTH_ERROR,
      payload: false
    });

    const url = `${apiUrl}/user/auth`;
    const response = await axios.post(url, userCredentials);
    const payload = response.data;

    // add user to redux storage
    dispatch({
      type: userActions.AUTH_USER,
      payload
    });

    return response;
  } catch (e) {
    // display an error at the login form
    dispatch({
      type: userActions.AUTH_ERROR,
      payload: true
    });

    return Promise.reject(e);
  }
};

// log user off
export function logoutUser() {
  return {
    type: userActions.LOGOUT_USER
  };
}

// signup user via server API
export const signupUser = userCredentials => async dispatch => {
  try {
    // reset an error
    dispatch({
      type: userActions.SIGNUP_ERROR,
      payload: false
    });

    const url = `${apiUrl}/user`;
    const response = await axios.post(url, userCredentials);
    const payload = response.data;

    // add user to redux storage
    dispatch({
      type: userActions.AUTH_USER,
      payload
    });

    return response;
  } catch (e) {
    // display an error at the login form
    dispatch({
      type: userActions.SIGNUP_ERROR,
      payload: true
    });

    return Promise.reject(e);
  }
};
