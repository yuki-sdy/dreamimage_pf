class Api::V1::TopController < ApplicationController
  def index
    render json: {status: 200, message: "Welcom to DreamDiary!"}
  end
end