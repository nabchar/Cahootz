class AddActiveColumnToUsersTable < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :active, :boolean, default: false
  end
end
