# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_12_25_095724) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dream_diaries", force: :cascade do |t|
    t.string "title", null: false
    t.string "body", null: false
    t.string "content", null: false
    t.string "prompt", null: false
    t.date "dream_date", null: false
    t.integer "impression", default: 0, null: false
    t.integer "dream_type", default: 0, null: false
    t.boolean "state", default: false, null: false
    t.text "image", default: ""
    t.text "diary_ogp", default: ""
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_dream_diaries_on_user_id"
  end

  create_table "image_boxes", force: :cascade do |t|
    t.boolean "limit", default: false, null: false
    t.integer "user_type", default: 0, null: false
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_image_boxes_on_user_id"
  end

  create_table "images", force: :cascade do |t|
    t.text "image", null: false
    t.bigint "user_id"
    t.bigint "image_box_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["image_box_id"], name: "index_images_on_image_box_id"
    t.index ["user_id"], name: "index_images_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.string "introduction"
    t.boolean "is_guest", default: false, null: false
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "dream_diaries", "users"
  add_foreign_key "image_boxes", "users"
  add_foreign_key "images", "image_boxes"
  add_foreign_key "images", "users"
end
