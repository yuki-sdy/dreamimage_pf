class ImageBox < ApplicationRecord
  belongs_to :user, optional: true
  has_many :images

end