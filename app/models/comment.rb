class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :dream_diary
end
