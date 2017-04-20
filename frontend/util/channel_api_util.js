
export const fetchAllChannels = () => (
  $.ajax({
    method: 'GET',
    url: 'api/channels',
  })
);

export const fetchSingleChannel = id => (
  $.ajax({
    method: 'GET',
    url: `api/channels/${id}`
  })
);

export const createChannel = channel => (
  $.ajax({
    url: 'api/channels',
    method: 'POST',
    data: { channel }
  })
);

export const updateChannel = channel => (
  $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'PATCH',
    data: { channel }
  })
);

export const deleteChannel = id => (
  $.ajax({
    url: `api/channels/${id}`,
    method: 'DELETE'
  })
);
