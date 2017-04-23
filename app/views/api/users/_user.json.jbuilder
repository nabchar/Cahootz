json.currentUser do
  json.extract! user, :id, :username, :previous_channel_id
end

json.subscriptions do
  json.array! user.subscribed_channels
end
