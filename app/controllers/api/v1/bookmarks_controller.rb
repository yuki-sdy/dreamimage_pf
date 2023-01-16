class Api::V1::BookmarksController < ApplicationController
  before_action :set_bookmark_attributes, only: %i[create]

  def create
    bookmark = @current_user.bookmark(@dream_diary)
    render json: { status: 200, bookmark: bookmark }
  end
  
  def destroy
    @dream_diary = DreamDiary.find(bookmark_params[:dream_diary_id])
    current_api_v1_user.remove_bookmark(@dream_diary)
    render json: { status: 200 }
  end
  
  private
  
  def bookmark_params
    params.permit(:user_id, :dream_diary_id)
  end
  
  def set_bookmark_attributes
    @current_user = User.find(bookmark_params[:user_id])
    @dream_diary = DreamDiary.find(bookmark_params[:dream_diary_id])
  end
end