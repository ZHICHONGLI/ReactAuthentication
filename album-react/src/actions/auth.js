// We always define constants
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../constants/auth';

// Intercepted by a redux-saga
function loginUser (redirection) {
  return {
    type: LOGIN_USER,
    redirection
  };
}

// In case of successful response from the server
function loginUserSuccess (token) { // It carries the token!
  return {
    type: LOGIN_USER_SUCCESS,
    token
  };
}

// In case of failure
function loginUserFailure () {
  return {
    type: LOGIN_USER_FAILURE
  };
}

export {
  loginUser,
  loginUserSuccess,
  loginUserFailure
};