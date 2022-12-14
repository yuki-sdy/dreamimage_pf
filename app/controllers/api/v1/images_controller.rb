class Api::V1::ImagesController < ApplicationController
  require 'net/http'

  def create
    current_user = User.find(image_params[:user_id]) if image_params[:user_id]
    res = create_image(image_params[:prompts])
    if res[:status] == '200'
      current_user.images.create(image: res[:image])
      render json: { status: 200, image: res[:image] }
    else
      render json: { status:500, image: "作成に失敗しました" }
    end
  end

  private
  
  def image_params
    params.permit(:prompts, :user_id)
  end

  def create_image(prompts)
    uri = URI('https://api.rinna.co.jp/models/tti/v2')
    request = Net::HTTP::Post.new(uri.request_uri)

    # Request headers
    request['Content-Type'] = 'application/json'
    request['Cache-Control'] = 'no-cache'
    request['Ocp-Apim-Subscription-Key'] = ''

    # Request body
    request.body = {
      "prompts" => prompts,
      "scale" => 7.5
    }.to_json

    response = Net::HTTP.start(uri.host, uri.port, 
    :use_ssl => uri.scheme == 'https') do |http|
      http.request(request)
    end

    status = response.code
    response_body = JSON.parse(response.body)
    image = response_body['image']

    return {status: status, image: image}
  end
end