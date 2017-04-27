json.extract! @channel, :id, :name, :purpose, :description, :private, :created_at
json.members do
  json.array! @channel.members do |member|
    json.extract! member, :id, :username
    json.avatar_url asset_path(member.avatar.url)
  end
end
json.set! :creator do
  json.partial! 'api/users/user', user: @channel.creator
  json.avatar_url asset_path(@channel.creator.avatar.url)
end
json.memberCount @channel.members.count
