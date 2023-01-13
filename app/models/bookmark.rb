class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :dream_diary

  validates :user_id, uniqueness: { scope: :dream_diary_id }
end
