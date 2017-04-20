import { RECEIVE_ALL_CHANNELS, REMOVE_CHANNEL } from '../actions/channel_actions';

const ChannelsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let nextState;

  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      nextState = Object.assign({}, oldState);
      return Object.assign(nextState, action.channels);
    case REMOVE_CHANNEL:
      
    default:
      return oldState;
  }
};

export default ChannelsReducer;
