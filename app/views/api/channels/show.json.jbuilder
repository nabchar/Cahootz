json.extract! @channel, :id, :name, :purpose, :description, :private, :created_at
json.members do
  json.array! @channel.members, partial: 'api/users/user', as: :user
end
json.set! :creator do
  json.partial! 'api/users/user', user: @channel.creator
end
json.memberCount @channel.members.count
