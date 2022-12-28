class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image

  has_many :dream_diaries
end
