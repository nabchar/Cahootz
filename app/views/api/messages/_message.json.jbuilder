json.extract! message, :id, :channel_id, :created_at, :content
json.author do
  json.extract! message.author, :id, :username
  json.avatar_url asset_path(message.author.avatar.url)
end
