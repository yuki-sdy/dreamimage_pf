class CreateDreamDiary < ActiveRecord::Migration[6.1]
  def change
    create_table :dream_diaries do |t|
      t.string :title
      t.string :body
      t.string :prompt
      t.date :dream_date
      t.integer :impression, null: false, default: 0
      t.integer :dream_type, null: false, default: 0
      t.integer :state, null: false, default: 0
      t.text :image
      t.string :diary_ogp
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
