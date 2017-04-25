import * as MessageApiUtil from '../util/message_api_util';
import { receiveErrors } from './shared/error_actions';


// CONSTANTS
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const FETCH_MESSAGES = "FETCH_MESSAGES";

//ACTIONS
export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});


export const removeMessage = message => ({
  type: REMOVE_MESSAGE,
  message
});

//THUNK ACTIONS
export const fetchMessages = (channelId) => dispatch => {
  dispatch({type: FETCH_MESSAGES});
  return MessageApiUtil.fetchMessages(channelId)
    .then(res => dispatch(receiveMessages(res)));
};

export const createMessage = (message, channelId) => dispatch => (
  MessageApiUtil.createMessage(message, channelId)
    .then(res => {
      return dispatch(receiveMessage(res));
    }, err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateMessage = (message) => dispatch => (
  MessageApiUtil.updateMessage(message)
    .then(res => dispatch(receiveMessage(res)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteMessage = (id) => dispatch => (
  MessageApiUtil.deleteMessage(id)
    .then(res => dispatch(removeMessage(res)))
);
