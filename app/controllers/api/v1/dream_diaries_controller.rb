class Api::V1::DreamDiariesController < ApplicationController
  require 'base64'
  
  before_action :set_dream_diary, only: %i[show edit update destroy]

  def index
    dream_diaries = DreamDiary.where(state: true).order(created_at: :desc)
    render json: dream_diaries, include: [:user], status: 200
  end
  
  def show
    render json: @dream_diary, include: 'likes,bookmarks,comments.user,user', status: 200
  end
  
  def create
    dream_diary = DreamDiary.new(dream_diary_params_with_ogp)
    dream_diary[:user_id] = nil if dream_diary[:user_id] == 0
    if dream_diary.save
      id = DreamDiary.maximum(:id)
      render json: {status: 200, dream_diary: dream_diary, id: id, message: "夢絵日記を作成しました！"}
    else
      render json: { status:500, message: "内容を確認してください", severity: "error" }
    end
  end

  def update
    if @dream_diary.update(dream_diary_params_with_ogp)
      render json: {status: 200, dream_diary: @dream_diary, id: @dream_diary.id , message: "夢絵日記を更新しました！"}
    else
      render json: { status:500, message: "更新に失敗しました", severity: "error" }
    end
  end

  def destroy
    if @dream_diary.destroy
      render json: { status: 200, message: '削除しました！'}
    else
      render json: { status: 500, message: "削除できません", severity: "error" }
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
      render json: { status: 500 }
    end
  end

  def back
    dream_diary = DreamDiary.new(dream_diary_params)
    render json: { status: 200, dream_diary: dream_diary }
  end
  
  def share
    display_url = TwitterShare.send(params[:url])   
    render json: { status: 200, display_url: display_url}
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