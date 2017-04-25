import * as APIUtil from '../util/session_api_util';
import { receiveErrors } from './shared/error_actions';
import { hashHistory } from 'react-router';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
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

export const logOut = () => dispatch => {
  return APIUtil.logOut().then(res => {
    return dispatch(receiveCurrentUser({}));
  });
};
