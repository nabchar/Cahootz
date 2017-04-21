json.currentUser do
  json.extract! user, :id, :username
end

json.subscriptions do
  json.array! user.subscribed_channels
end
