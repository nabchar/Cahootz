class AddUserIdToChannelTable < ActiveRecord::Migration[5.0]
  def change
    add_column :channels, :user_id, :integer, null: false
  end
end
