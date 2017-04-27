json.currentUser do
  json.extract! user, :id, :username, :previous_channel_id
  json.avatar_url asset_path(user.avatar.url)
end

json.subscriptions do
  json.array! user.subscribed_channels
end
