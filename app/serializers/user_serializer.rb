class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image

  has_many :dream_diaries
  has_many :likes

  has_many :bookmarks
end