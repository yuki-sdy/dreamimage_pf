class Api::V1::CommentsController < ApplicationController
  before_action :set_comment_attributes, only: %i[create]

  def create
    @dream_diary[:comment_count] = @dream_diary.comments.count + 1
    @dream_diary.save
    comment = @current_user.comments.new(comment_params)
    if comment.save
      render json: comment, include: [:user], status: 200
    end
  end
  
  def destroy
    @dream_diary = DreamDiary.find(comment_params[:dream_diary_id])
    @dream_diary[:comment_count] = @dream_diary.comments.count - 1
    @dream_diary.save
    comment = current_api_v1_user.comments.find(params[:id])
    comment.destroy
    render json: { status: 200 }
  end

  private

  def comment_params
    params.permit(:user_id, :dream_diary_id, :body)
  end

  def set_comment_attributes
    @current_user = User.find(comment_params[:user_id])
    @dream_diary = DreamDiary.find(comment_params[:dream_diary_id])
  end
end