class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.text :image
      t.references :user, foreign_key: true
      # image_box_idも後で追加する

      t.timestamps
    end
  end
end
