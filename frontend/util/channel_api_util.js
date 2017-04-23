
export const fetchAllChannels = () => (
  $.ajax({
    method: 'GET',
    url: 'api/channels',
  })
);

export const createChannel = channel => {
  return $.ajax({
    url: 'api/channels',
    method: 'POST',
    data: { channel }
  });
};

export const deleteChannel = id => (
  $.ajax({
    url: `api/channels/${id}`,
    method: 'DELETE'
  })
);

export const fetchSingleChannel = id => (
  $.ajax({
    method: 'GET',
    url: `api/channels/${id}`
  })
);


export const updateChannel = channel => {
  return $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'PATCH',
    data: channel
  });
};


export const fetchSubscribedChannels = () => (
  $.ajax({
    method: 'GET',
    url: 'api/subscriptions'
  })
);

export const subscribeToChannel = channelId => {
  debugger
  return $.ajax({
    url: `api/subscriptions`,
    method: 'POST',
    data: {channelId}
  });
};

export const unsubscribeFromChannel = channelId => (
  $.ajax({
    url: `api/subscriptons/${channelId}`,
    method: 'DELETE'
  })
);
