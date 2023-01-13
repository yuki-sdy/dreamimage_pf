class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      t.references :user, foreign_key: true
      t.references :dream_diary, foreign_key: true

      t.timestamps
    end
    add_index :likes, [:user_id, :dream_diary_id], unique: true
  end
end
