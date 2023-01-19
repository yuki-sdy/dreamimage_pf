class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :dream_diary_id, :body, :created_at

  belongs_to :user
  belongs_to :dream_diary
end