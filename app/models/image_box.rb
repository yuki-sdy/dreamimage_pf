class ImageBox < ApplicationRecord
  belongs_to :user, optional: true
  has_many :images, dependent: :destroy

  scope :today_box, -> { find_by(created_at: Time.zone.now.all_day) }
  scope :pasts, -> { where('created_at < ?', Time.zone.now.midnight) }
end