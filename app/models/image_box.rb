class ImageBox < ApplicationRecord
  belongs_to :user, optional: true
  has_many :images, dependent: :destroy

  scope :created_today, -> { find_by("created_at >= ?", Time.zone.now.beginning_of_day) }

end