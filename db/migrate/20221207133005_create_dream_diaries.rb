class CreateDreamDiaries < ActiveRecord::Migration[6.1]
  def change
    create_table :dream_diaries do |t|
      t.string :title, null: false
      t.string :body, null: false
      t.string :content, null: false
      t.string :prompt, null: false
      t.date :dream_date, null: false
      t.integer :impression, null: false, default: 0
      t.integer :dream_type, null: false, default: 0
      t.boolean :state, null: false, default: false
      t.text :image, default: ""
      t.text :diary_ogp, default: ""
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
