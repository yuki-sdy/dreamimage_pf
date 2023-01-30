class Api::V1::LikesController < ApplicationController
  before_action :set_like_attributes, only: %i[create destroy]

  def create
    @dream_diary[:like_count] = @dream_diary.likes.count + 1
    @dream_diary.save
    like = @current_user.like(@dream_diary)
    render json: { status: 200, like: like }
  end
  
  def destroy
    @dream_diary[:like_count] = @dream_diary.likes.count - 1
    @dream_diary.save
    current_api_v1_user.unlike(@dream_diary)
    likes = @dream_diary.likes
    render json: { status: 200, likes: likes }
  end
  
  private
  
  def like_params
    params.permit(:user_id, :dream_diary_id)
  end
  
  def set_like_attributes
    @current_user = User.find(like_params[:user_id])
    @dream_diary = DreamDiary.find(like_params[:dream_diary_id])
  end
end