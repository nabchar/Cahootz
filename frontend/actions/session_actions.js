import * as APIUtil from '../util/session_api_util'
import { receiveErrors } from './shared/error_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});


// thunk actions
export const signUp = user => dispatch => (
  APIUtil.signUp(user)
    .then(user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const signIn = user => dispatch => (
  APIUtil.signIn(user)
    .then(user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const logOut = () => dispatch => (
  APIUtil.logOut().then(user => dispatch(receiveCurrentUser(null)))
);
