class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.text :image, null: false
      t.references :user, foreign_key: true, default: ""
      t.references :image_box, foreign_key: true

      t.timestamps
    end
  end
end
