@channels.each do |channel|
  @memberCount = channel.members.count
  if channel.private

  else
    json.set! channel.id do
      json.extract! channel, :id, :name, :purpose, :private, :created_at
      json.creator do
        json.extract! channel.creator, :id, :username
      end
      json.memberCount @memberCount
    end
  end

end
