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
    if dream_diaries.save
      render json: {status: 200, dream_diary: dream_diary }
    else
      render json: { status:500, dream_diary: "作成に失敗しました" }
    end
  end

  def edit
    render json: { status: 200, dream_diary: @dream_diary }
  end

  def update
    if @dream_diary.update(dream_diary_params)
      render json: {status: 200, dream_diary: dream_diary }
    else
      render json: { status:500, dream_diary: "更新に失敗しました" }
    end
  end

  def destroy
    if @dream_diary.destroy
      render json: {status: 200 }
    else
      render json: { status:500, dream_diary: "削除できません" }
    end
  end

  private

  def set_dream_diary
    @dream_diary = DreamDiary.find(params[:id])
  end

  def dream_diary_params
    params.permit()
  end
end