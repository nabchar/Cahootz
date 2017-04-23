import * as ChannelApiUtil from '../util/channel_api_util';

//CONSTANTS
export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const FETCH_CHANNELS = "REQUEST_CHANNELS";


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

export const createChannel = channel => dispatch => (
  ChannelApiUtil.createChannel(channel)
    .then(res => dispatch(receiveChannel(res)),
          (err => console.log(err)))
);

export const updateChannel = channel => dispatch => (
  ChannelApiUtil.updateChannel(channel)
    .then(res => dispatch(receiveChannel(res)))
);

export const deleteChannel = id => dispatch => (
  ChannelApiUtil.deleteChannel(id)
    .then(res => dispatch(removeChannel(res)))
);
