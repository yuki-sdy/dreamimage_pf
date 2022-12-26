class Api::V1::DreamDiariesController < ApplicationController
  require 'base64'
  before_action :set_dream_diary, only: %i[show edit update destroy]

  def index
    render json: { status: 200, dream_diaries: DreamDiary.all }
  end

  def show
    render json: { status: 200, dream_diary: @dream_diary }
  end
  
  def create
    dream_diary = DreamDiary.new(dream_diary_params_with_ogp)
    dream_diary[:user_id] = nil if dream_diary[:user_id] == 0
    if dream_diary.save
      id = DreamDiary.maximum(:id)
      render json: {status: 200, dream_diary: dream_diary, id: id }
    else
      render json: { status:500, dream_diary: "作成に失敗しました" }
    end
  end

  def update
    if @dream_diary.update(dream_diary_params_with_ogp)
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

    ogp = OgpCreator.build(
      dream_diary.title, dream_diary.body, dream_diary.content, 
      dream_diary.prompt, dream_diary.image, 
      dream_diary.impression, dream_diary.dream_type, dream_diary.dream_date
      ).tempfile.open.read
    diary_ogp = "data:image/png;base64," + Base64.strict_encode64(ogp)

    if dream_diary.valid?
      render json: { status: 200, dream_diary: dream_diary, diary_ogp: diary_ogp }
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
    params.permit(:title, :body, :content, :prompt, :state, :impression, :dream_type, :dream_date, :image, :user_id)
  end

  def dream_diary_params_with_ogp
    params.require(:dream_diary).permit(:title, :body, :content, :prompt, :state, :impression, :dream_type, :dream_date, :image, :user_id).merge(params.permit(:diary_ogp))
  end
end