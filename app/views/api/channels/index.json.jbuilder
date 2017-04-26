@channels.each do |channel|
  @memberCount = channel.members.count
  if channel.private
    json.set! channel.id do
      json.extract! channel, :id, :created_at
      json.members do
        json.array! channel.members do |member|
          json.extract! member, :id, :username
        end
      end
      json.memberCount @memberCount
    end
  else
    json.set! channel.id do
      json.extract! channel, :id, :name, :purpose, :created_at
      json.creator do
        json.extract! channel.creator, :id, :username
      end
      json.memberCount @memberCount
    end
  end

end
