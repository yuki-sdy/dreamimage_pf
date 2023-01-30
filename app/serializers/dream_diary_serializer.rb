class DreamDiarySerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :prompt, :state, :image, :content, :dream_date, :impression, :dream_type, :diary_ogp, :user_id, :like_count, :comment_count
    
  belongs_to :user
  has_many :likes
  has_many :bookmarks
  has_many :comments
end
