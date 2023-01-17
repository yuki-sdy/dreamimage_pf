# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
        #  :omniauthable, omniauth_providers: [:twitter]
  include DeviseTokenAuth::Concerns::User
  
  mount_uploader :image, ImageUploader

  # userが削除されても残す
  has_many :dream_diaries, dependent: :nullify
  has_many :likes, dependent: :nullify
  has_many :likes_dream_diaries, through: :likes, source: :dream_diary
  has_many :bookmarks, dependent: :nullify
  has_many :bookmarks_dream_diaries, through: :bookmarks, source: :dream_diary
  has_many :comments, dependent: :nullify
  # userが削除されたら一緒に消す
  has_many :images, dependent: :destroy
  has_many :image_boxes, dependent: :destroy

  def like(dream_diary)
    likes_dream_diaries << dream_diary
  end

  def unlike(dream_diary)
    likes_dream_diaries.destroy(dream_diary)
  end

  def bookmark(dream_diary)
    bookmarks_dream_diaries << dream_diary
  end

  def remove_bookmark(dream_diary)
    bookmarks_dream_diaries.destroy(dream_diary)
  end
end
