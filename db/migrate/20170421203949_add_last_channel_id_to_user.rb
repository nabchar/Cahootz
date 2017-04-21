class AddLastChannelIdToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :previous_channel_id, :integer 
  end
end
