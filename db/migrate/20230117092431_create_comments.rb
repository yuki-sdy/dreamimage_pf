class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.references :user, foreign_key: true
      t.references :dream_diary, foreign_key: true

      t.timestamps
    end
  end
end
