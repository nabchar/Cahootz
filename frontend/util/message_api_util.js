export const fetchMessages = (channelId) => {
  return $.ajax({
    method: 'GET',
    url: `api/channels/${channelId}/messages`
  });
};

export const createMessage = (message, channelId) => {
  return $.ajax({
    url: `api/channels/${channelId}/messages`,
    method: 'POST',
    data: { message }
  });
};

export const updateMessage = message => {
  return $.ajax({
    url: `api/messages/${message.id}`,
    method: 'PATCH',
    data: {message}
  });
};

export const deleteMessage = id => (
  $.ajax({
    url: `api/messages/${id}`,
    method: 'DELETE'
  })
);
