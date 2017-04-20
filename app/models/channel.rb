# == Schema Information
#
# Table name: channels
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  purpose     :string
#  description :string
#  private     :boolean          default("false")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#

class Channel < ApplicationRecord
  validates :name, presence: true
  validates :private, presence: true

  belongs_to :creator,
    foreign_key: user_id,
    class_name: 'User'

  has_many :subscriptions

  has_many :members,
    through: :subscriptions,
    source: :member
end
