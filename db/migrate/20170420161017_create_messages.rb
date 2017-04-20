class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :content, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :messages, :user_id
  end
end
