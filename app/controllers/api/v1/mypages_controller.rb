class Api::V1::MypagesController < ApplicationController
  def index
    dream_diaries = current_api_v1_user.dream_diaries
    render json: dream_diaries, include: [:user], status: 200
  end
end