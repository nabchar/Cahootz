class AddEmailColumnToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :email, :string, default: "you@cahootz.com"
  end
end
