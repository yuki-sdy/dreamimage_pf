class Api::V1::UsersController < ApplicationController
  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: { status: 200, message: 'Delete the user'}
  end
end