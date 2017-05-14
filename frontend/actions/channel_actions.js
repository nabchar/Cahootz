import * as ChannelApiUtil from '../util/channel_api_util';
import { receiveCurrentUser } from './session_actions';
import { receiveErrors } from './shared/error_actions';

//CONSTANTS
export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const FETCH_CHANNELS = "FETCH_CHANNELS";
export const FETCH_DIRECT_MESSAGES = "FETCH_DIRECT_MESSAGES";


export const RECEIVE_DIRECT_MESSAGES = "RECEIVE_DIRECT_MESSAGES";
export const RECEIVE_DIRECT_MESSAGE = "RECEIVE_DIRECT_MESSAGE";

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

const receiveDirectMessages = dms => ({
  type: RECEIVE_DIRECT_MESSAGES,
  dms
});

const receiveDirectMessage = dm => ({
  type: RECEIVE_DIRECT_MESSAGE,
  dm
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

export const subscribeToChannel = channelId => dispatch => (
  ChannelApiUtil.subscribeToChannel(channelId)
    .then(res => dispatch(receiveCurrentUser(res)))
);

export const unsubscribeFromChannel = channelId => dispatch => (
  ChannelApiUtil.unsubscribeFromChannel(channelId)
    .then(res => dispatch(receiveCurrentUser(res)))
);

export const fetchDirectMessages = () => dispatch => {
  dispatch({type: FETCH_DIRECT_MESSAGES});
  return ChannelApiUtil.fetchDirectMessages()
    .then(res => dispatch(receiveDirectMessages(res)));
};

export const fetchDirectMessage = (id) => dispatch => {
  return ChannelApiUtil.fetchDirectMessage(id)
    .then(res => dispatch(receiveDirectMessage(res)));
};

export const createDirectMessage = members => dispatch => (
  ChannelApiUtil.createDirectMessage(members)
    .then(res => dispatch(receiveDirectMessage(res)),
      err => dispatch(receiveErrors(err.responseJSON)))
);
