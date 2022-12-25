class Api::V1::UsersController < ApplicationController
  # 退会処理
  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: { status: 200 }
  end
end