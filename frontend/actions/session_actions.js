import * as APIUtil from '../util/session_api_util';
import { receiveErrors } from './shared/error_actions';
import { hashHistory } from 'react-router';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const FETCH_USERS = "FETCH_USERS";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});


// thunk actions
export const signUp = user => dispatch => (
  APIUtil.signUp(user)
    .then(res => dispatch(receiveCurrentUser(res)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const signIn = user => dispatch => (
  APIUtil.signIn(user)
    .then(res => dispatch(receiveCurrentUser(res)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const logOut = () => dispatch => {
  return APIUtil.logOut().then(res => {
    return dispatch(receiveCurrentUser({}));
  });
};

export const fetchUsers = () => dispatch => {
  dispatch({type: FETCH_USERS});
  return APIUtil.fetchUsers().then(res => {
    return dispatch(receiveUsers(res));
  });
};
