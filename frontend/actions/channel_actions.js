import * as ChannelApiUtil from '../util/channel_api_util';

//CONSTANTS
export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

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
export const fetchAllChannels = () => dispatch => (
  ChannelApiUtil.fetchAllChannels()
    .then(channels => dispatch(receiveAllChannels(channels)))
);

export const fetchSingleChannel = id => dispatch => (
  ChannelApiUtil.fetchSingleChannel(id)
    .then(channel => dispatch(receiveChannel(channel)))
);

export const createChannel = channel => dispatch => (
  ChannelApiUtil.createChannel(channel)
    .then(channel => dispatch(receiveChannel(channel)))
);

export const updateChannel = channel => dispatch => (
  ChannelApiUtil.updateChannel(channel)
    .then(channel => dispatch(receiveChannel(channel)))
);

export const deleteChannel = id => dispatch => (
  ChannelApiUtil.deleteChannel(id)
    .then(channel => dispatch(removeChannel(channel)))
);
