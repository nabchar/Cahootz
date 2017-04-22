import { RECEIVE_ALL_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from '../actions/channel_actions';

const ChannelsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let nextState;

  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      nextState = Object.assign({}, oldState);
      return Object.assign(nextState, action.channels);
    case RECEIVE_CHANNEL:
      nextState = Object.assign({}, oldState);
      return Object.assign(nextState, {[action.channel.id]: action.channel});
    case REMOVE_CHANNEL:
      let nextState = merge({}, oldState);
      delete nextState[action.channel.id];
      return nextState;
    default:
      return oldState;
  }
};

export default ChannelsReducer;
