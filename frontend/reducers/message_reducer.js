import { RECEIVE_MESSAGES,
         RECEIVE_MESSAGE,
         REMOVE_MESSAGE } from '../actions/message_actions';

const _defaultState = {
  isFetching: true
};

const MessageReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState);
  let nextState;
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return Object.assign({}, action.messages);
    case RECEIVE_MESSAGE:
      return Object.assign({}, oldState, {[action.message.id]: action.message});
    case REMOVE_MESSAGE:
      nextState = Object.assign({}, oldState);
      delete nextState[action.message.id];
      return nextState;
    default:
      return oldState;
  }
};

export default MessageReducer;
