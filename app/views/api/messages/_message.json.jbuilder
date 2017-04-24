json.extract! message, :id, :channel_id, :created_at, :content
json.author do
  json.extract! message.author, :id, :username
end
