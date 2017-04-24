import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  FETCH_CHANNELS
} from '../actions/channel_actions';

import { RECEIVE_MESSAGES,
         FETCH_MESSAGES} from '../actions/message_actions';

const _defaultState = false;
const fetchingReducer = (oldState = _defaultState, action) => {
  switch (action.type) {
    case FETCH_CHANNELS:
      return true;
    case FETCH_MESSAGES:
      return true;
    case RECEIVE_ALL_CHANNELS:
      return false;
    case RECEIVE_MESSAGES:
      return false;
    case RECEIVE_CHANNEL:
      return false;
    default:
      return oldState;
  }
};

export default fetchingReducer;
