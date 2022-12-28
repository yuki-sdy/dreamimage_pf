class DreamDiarySerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :content, :dream_date, :impression, :dream_type

  belongs_to :user
end
