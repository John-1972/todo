class AddRelationshipCols < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :todolist_id, :integer
    add_column :todolists, :user_id, :integer
    add_index :tasks, :todolist_id
    add_index :todolists, :user_id
  end
end
