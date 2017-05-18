User.destroy_all
Channel.destroy_all
Subscription.destroy_all
Message.destroy_all

admin = User.create!(username: "hootz_bot", password: "hardpassword")
user1 = User.create!(username: "mr_xi", password: "password")
user2 = User.create!(username: "nabchar", password: "starwars")
user3 = User.create!(username: "darth_v", password: "vaderbaby")
user4 = User.create!(username: "luke_s", password: "skywalker")
brain = User.create!(username: "the_brain", password: "password")
pinky = User.create!(username: "pinky", password: "password")

users = [user1, user2, user3, user4, brain, pinky]

channel1 = Channel.create!(name: "general", purpose: "General discussion", user_id: admin.id)
channel2 = Channel.create!(name: "random", purpose: "Random discussion", user_id: admin.id)
channel3 = Channel.create!(name: "daily_ponderings", purpose: "Your daily ponderings of Rattus norvegicus", user_id: pinky.id)
channel4 = Channel.create!(name: "evening_plans", purpose: "World domination", user_id: brain.id)

channels = [channel1, channel2]

channels.each do |channel|
  users.each do |user|
    Subscription.create!(user_id: user.id, channel_id: channel.id)
  end
end

channels2 = [channel3, channel4]
users2 = [brain, pinky]

channels2.each do |channel|
  users2.each do |user|
    Subscription.create!(user_id: user.id, channel_id: channel.id)
  end
end

def generate_dm_code
  SecureRandom::urlsafe_base64(10) + "private";
end

dm0 = Channel.create!(user_id: brain.id, private: true, name: generate_dm_code)
dm1 = Channel.create!(user_id: brain.id, private: true, name: generate_dm_code)
dm2 = Channel.create!(user_id: brain.id, private: true, name: generate_dm_code)
dm3 = Channel.create!(user_id: pinky.id, private: true, name: generate_dm_code)
dm4 = Channel.create!(user_id: pinky.id, private: true, name: generate_dm_code)
dm5 = Channel.create!(user_id: pinky.id, private: true, name: generate_dm_code)

#subscribe guest accounts to dm with themselves
Subscription.create!(user_id: brain.id, channel_id: dm0.id)
Subscription.create!(user_id: pinky.id, channel_id: dm3.id)

#subscribe guests accounts to other dms
Subscription.create!(user_id: brain.id, channel_id: dm1.id)
Subscription.create!(user_id: brain.id, channel_id: dm2.id)
Subscription.create!(user_id: pinky.id, channel_id: dm4.id)
Subscription.create!(user_id: pinky.id, channel_id: dm5.id)


brains_dms = [dm1, dm2]
pnkys_dms = [dm4, dm5]

Subscription.create!(user_id: user2.id, channel_id: dm1.id)
Subscription.create!(user_id: user3.id, channel_id: dm2.id)

Subscription.create!(user_id: user4.id, channel_id: dm4.id)
Subscription.create!(user_id: user3.id, channel_id: dm5.id)


#setup auto login to #general for every user.
generalChannel = Channel.first.id
users.each do |user|
  user.previous_channel_id = generalChannel;
  user.save!
end

#setup seed avatars
user1.avatar = File.open('app/assets/images/xi.jpeg')
user1.save!

user3.avatar = File.open('app/assets/images/darth_avatar.jpeg')
user3.save!

user4.avatar = File.open('app/assets/images/skywalker.png')
user4.save!

brain.avatar = File.open('app/assets/images/brain.jpeg')
brain.save!

pinky.avatar = File.open('app/assets/images/pinky.jpeg')
pinky.save!

#general seed messages
Message.create!(user_id: user3.id, channel_id: channel1.id, content: "Luke, I am your father...")
Message.create!(user_id: user4.id, channel_id: channel1.id, content: "Nooooooooo!!!!!")
Message.create!(user_id: user3.id, channel_id: channel1.id, content: "Maybe this wasn't the best venue to tell you, let's take this to a private direct message")
Message.create!(user_id: brain.id, channel_id: channel1.id, content: "Pinky, are you pondering what I'm pondering?")
Message.create!(user_id: pinky.id, channel_id: channel1.id, content: "Well, I think so, Brain, but if Jimmy cracks corn, and no one cares, why does he keep doing it?")

#daily ponderings seed messages
Message.create!(user_id: brain.id, channel_id: channel3.id, content: "Pinky, are you pondering what I'm pondering?")
Message.create!(user_id: pinky.id, channel_id: channel3.id, content: "Yes Brain, but if our knees bent the other way, how would we ride a bicycle? ")
Message.create!(user_id: brain.id, channel_id: channel3.id, content: "Pinky, are you pondering what I'm pondering?")
Message.create!(user_id: pinky.id, channel_id: channel3.id, content: "Woof, oh, I'd have to say the odds of that are terribly slim, Brain.")
Message.create!(user_id: brain.id, channel_id: channel3.id, content: "True.")
Message.create!(user_id: pinky.id, channel_id: channel3.id, content: "I mean, really, when have I ever been pondering what you've been pondering?")
Message.create!(user_id: brain.id, channel_id: channel3.id, content: "To my knowledge, never.")
Message.create!(user_id: pinky.id, channel_id: channel3.id, content: "Exactly. So, what are the chances that this time, I'm pondering what you're pondering? ")
Message.create!(user_id: brain.id, channel_id: channel3.id, content: "Next to nil.")
Message.create!(user_id: pinky.id, channel_id: channel3.id, content: "Well, that's exactly what I'm thinking, too.")
Message.create!(user_id: brain.id, channel_id: channel3.id, content: "Therefore, you ARE pondering what I'm pondering.")
Message.create!(user_id: pinky.id, channel_id: channel3.id, content: "Poit, I guess I am.")

#evening_plans
Message.create!(user_id: brain.id, channel_id: channel4.id, content: "Pinky, are you pondering what I'm pondering?")
Message.create!(user_id: pinky.id, channel_id: channel4.id, content: " I think so, Brain, but if they called them sad meals no one would buy them.")
Message.create!(user_id: brain.id, channel_id: channel4.id, content: ".....")
Message.create!(user_id: brain.id, channel_id: channel4.id, content: "Come, Pinky, we must prepare for tomorrow night.")
Message.create!(user_id: pinky.id, channel_id: channel4.id, content: "What are we doing tomorrow Brain?")
Message.create!(user_id: brain.id, channel_id: channel4.id, content: "The same thing we do every night Pinky. Try to take over the world!")
