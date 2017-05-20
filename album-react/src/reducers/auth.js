import Immutable from 'immutable';
// We neeed jwt-decode to take the user name from the token and store it in the state
import jwtDecode from 'jwt-decode';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,

  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from '../constants/auth';

// The initial state has no token hence no name and isAuthenticated is false
const initialState = Immutable.Map({
  isAuthenticated: false,
  token: null,
  name: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    // Once the server sent a token, the saga dispatches loginUserSuccess 
    case SIGNUP_USER_SUCCESS:
    case LOGIN_USER_SUCCESS: { 
      return state.merge({
        isAuthenticated: true,
        token: action.token,
        name: jwtDecode(action.token).sub
      });
    }
    // In case of failure the state goes back to the initial one
    case SIGNUP_USER_FAILURE:
    case LOGIN_USER_FAILURE: return state.merge(initialState);
    default: return state;
  }
}