class Api::V1::MypagesController < ApplicationController
  def index
    dream_diaries = current_api_v1_user.dream_diaries
    render json: current_api_v1_user, 
    include: 'dream_diaries,bookmarks.dream_diary.user', status: 200
  end
end