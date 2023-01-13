class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :dream_diary_id

  belongs_to :user
  belongs_to :dream_diary
end