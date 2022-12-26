class Image < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :image_box

end