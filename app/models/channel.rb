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
  validates :name, :user_id, presence: true
  validates :name, uniqueness: true

  belongs_to :creator,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :subscriptions, dependent: :destroy
  has_many :members,
    through: :subscriptions,
    source: :member

  has_many :messages, dependent: :destroy
end
