import * as ChannelApiUtil from '../util/channel_api_util';
import { receiveCurrentUser } from './session_actions';
import { receiveErrors } from './shared/error_actions';

//CONSTANTS
export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const FETCH_CHANNELS = "FETCH_CHANNELS";


//ACTIONS
const receiveAllChannels = channels => ({
  type: RECEIVE_ALL_CHANNELS,
  channels
});

const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

const removeChannel = channel => ({
  type: REMOVE_CHANNEL,
  channel
});


//THUNK ACTIONS
export const fetchChannels = () => dispatch => {
  dispatch({type: FETCH_CHANNELS});
  return ChannelApiUtil.fetchAllChannels()
    .then(res => dispatch(receiveAllChannels(res)));
};

export const fetchChannel = id => dispatch => (
  ChannelApiUtil.fetchSingleChannel(id)
    .then(res => dispatch(receiveChannel(res)))
);

export const createChannel = channel => dispatch => (
  ChannelApiUtil.createChannel(channel)
    .then(res => dispatch(receiveChannel(res)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateChannel = channel => dispatch => (
  ChannelApiUtil.updateChannel(channel)
    .then(res => dispatch(receiveChannel(res)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteChannel = id => dispatch => (
  ChannelApiUtil.deleteChannel(id)
    .then(res => dispatch(removeChannel(res)))
);

// update current user after they subscribe to new channel
export const subscribeToChannel = channelId => dispatch => (
  ChannelApiUtil.subscribeToChannel(channelId)
    .then(res => dispatch(receiveCurrentUser(res)))
);

export const unsubscribeFromChannel = channelId => dispatch => (
  ChannelApiUtil.unsubscribeFromChannel(channelId)
    .then(res => dispatch(receiveCurrentUser(res)))
);
