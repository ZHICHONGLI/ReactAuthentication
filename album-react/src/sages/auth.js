import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
// We import the constant to use it in the watcher
import { LOGIN_USER } from '../constants/auth';
import {
  loginUserSuccess,
  loginUserFailure
} from '../actions/auth';
// push action-creators to change the view
import { push } from 'react-router-redux';
// We want to show a notification to the user once logged in
import {actions as toastrActions} from 'react-redux-toastr';

// Selector to get the credential from the form
const getForm = (state, form) => {
  return state.getIn(['form', form]).toJS();
}

// Fetch sends the credentials to the server
const sendCredentials = (route, credentials) => {
  return fetch(`http://localhost:8080/auth/${route}`, {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  .then(response => {
    if (response.status === 200) {
      return response.json(); // This contains the token!
    }
    throw response;
  });
};

function* loginUser (action) {
  // The redirection changes the view to the main page
  const { redirection } = action;
  try {
    const credentials = yield select(getForm, 'login');
    const result = yield call(sendCredentials, 'login', credentials.values);
    // Redux-toastr shows the users nice notifications
    yield put(toastrActions.add({
       type: 'success', // success is a green notification
       title: 'Retrogames Archive',
       message: result.message
    }));
    // We also save the token in the local storage
    localStorage.setItem('token', result.token); 
    // We send the token to the reducer
    yield put(loginUserSuccess(result.token));
    // Redirect to the main page!
    yield put(push(redirection));
  } catch (e) {
    // The status 401 has a personalized message to show in a notification
    let message = '';
    if(e.status === 401) {
      message = 'Invalid email/password';
    } else {
      message = 'Sorry, an error occured!';
    }
    // Set the state to initial state
    yield put(loginUserFailure());
    yield put(toastrActions.add({
       type: 'error', // Red notification
       title: 'Retrogames Archive',
       message: message
     }));
  }
}

// Saga watcher to intercept LOGIN_USER
export function* watchLoginUser () {
  yield takeLatest(LOGIN_USER, loginUser);
}