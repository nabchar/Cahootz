import { RECEIVE_ALL_CHANNELS,
        RECEIVE_CHANNEL,
        REMOVE_CHANNEL } from '../actions/channel_actions';

const _defaultState = {
  isFetching: true
};

const ChannelsReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      //action is dispatched once, upon inital render of main chat container
      return Object.assign({}, action.channels);

    case RECEIVE_CHANNEL:
      return Object.assign({}, oldState, {[action.channel.id]: action.channel});

    case REMOVE_CHANNEL:
      let nextState = Object.assign({}, oldState);
      delete nextState[action.channel.id];
      return nextState;

    default:
      return oldState;
  }
};

export default ChannelsReducer;
