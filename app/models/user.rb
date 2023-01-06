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

  has_many :dream_diaries, dependent: :nullify
  has_many :images, dependent: :destroy
  has_one :image_box, dependent: :destroy
end
