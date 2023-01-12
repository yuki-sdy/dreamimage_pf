class DreamDiarySerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :content, :dream_date, :impression, :dream_type, :diary_ogp, :user_id

  belongs_to :user
  has_many :likes
end
