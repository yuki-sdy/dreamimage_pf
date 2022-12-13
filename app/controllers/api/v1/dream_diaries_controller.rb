class Api::V1::DreamDiariesController < ApplicationController
  before_action :set_dream_diary, only: %i[show edit update destroy]

  def index
    dream_diaries = DreamDiary.all
    render json: { status: 200, dream_diaries: dream_diaries }
  end

  def show
    render json: { status: 200, dream_diary: @dream_diary }
  end
  
  def create
    dream_diary = DreamDiary.new(dream_diary_params)
    if dream_diary.save
      id = DreamDiary.maximum(:id)
      render json: {status: 200, dream_diary: dream_diary, id: id }
    else
      render json: { status:500, dream_diary: "作成に失敗しました" }
    end
  end

  def update
    if @dream_diary.update(dream_diary_params)
      render json: {status: 200, dream_diary: @dream_diary, id: @dream_diary.id }
    else
      render json: { status:500, dream_diary: "更新に失敗しました" }
    end
  end

  def destroy
    if @dream_diary.destroy
      render json: { status: 200, dream_diary: '削除しました' }
    else
      render json: { status: 500, dream_diary: "削除できません" }
    end
  end

  def preview
    dream_diary = DreamDiary.new(dream_diary_params)
    if dream_diary.valid?
      render json: { status: 200, dream_diary: dream_diary }
    else
      render json: { status: 401, dream_diary: dream_diary }
    end
  end

  def back
    dream_diary = DreamDiary.new(dream_diary_params)
    render json: { status: 200, dream_diary: dream_diary }
  end

  private

  def set_dream_diary
    @dream_diary = DreamDiary.find(params[:id])
  end

  def dream_diary_params
    params.permit(:title, :body, :prompt, :diary_ogp, :state, :impression, :dream_type, :dream_date, :user_id)
  end
end