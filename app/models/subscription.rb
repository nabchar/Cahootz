# == Schema Information
#
# Table name: subscriptions
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Subscription < ApplicationRecord
  validates :member, :channel, presence: true

  belongs_to :member,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :channel

end
