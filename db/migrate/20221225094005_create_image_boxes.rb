class CreateImageBoxes < ActiveRecord::Migration[6.1]
  def change
    create_table :image_boxes do |t|
      t.boolean :limit, null: false, default: false
      t.integer :user_type, null: false, default: 0
      t.references :user, foreign_key: true, default: ""

      t.timestamps
    end
  end
end
