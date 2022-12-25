class Api::V1::MypagesController < ApplicationController
  def index
    render json: { status: 200, dream_diaries: current_api_v1_user.dream_diaries }
  end
end