class DreamDiary < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy

  # validates :title, {presence: true, lengh: {maximum: 40}}
  # validates :content, {presence: true, lengh: {maximum: 80}}
  # validates :body, {presence: true, lengh: {maximum: 125}}
  # validates :prompt, {presence: true, lengh: {maximum: 40}}
end