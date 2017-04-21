@subscribed_channels.each do |channel|
  @memberCount = channel.members.count
  if channel.private

  else
    json.set! channel.id do
      json.extract! channel, :id, :name, :purpose, :private, :created_at
      json.set! :creator do
        json.partial! 'api/users/user', user: channel.creator
      end
      json.memberCount @memberCount
    end
  end

end
