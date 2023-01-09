class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[update destroy]
  
  def update
    if @user.update(user_params)
      render json: { status: 200, user: @user, message: "更新しました"}
    else
      render json: { status: 500, message: "更新に失敗しました", severity: "error" }
    end
  end

  # 退会処理
  def destroy
    @user.destroy
    render json: { status: 200 }
  end
  
  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:name, :introduction, :image)
  end
end