# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Channel.destroy_all
Subscription.destroy_all
Message.destroy_all

admin = User.create!(username: "admin", password: "hardpassword")
user1 = User.create!(username: "guest", password: "password")
user2 = User.create!(username: "nabchar", password: "starwars")

users = [user1, user2]

channel1 = Channel.create!(name: "general", purpose: "General Discussion", description: "", user_id: admin.id)
channel2 = Channel.create!(name: "random", purpose: "Random Discussion", description: "", user_id: admin.id)

channels = [channel1, channel2]

channels.each do |channel|
  users.each do |user|
    Subscription.create!(user_id: user.id, channel_id: channel.id)
  end
end
