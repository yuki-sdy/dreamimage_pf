class Api::V1::ImagesController < ApplicationController
  require 'net/http'

  def create
    current_user = User.find(image_params[:user_id])
    current_box = checked_box(current_user)
    if !current_box.limit?
      res = create_image(image_params[:prompts])
      if res[:status] == '200'

        if current_user
          current_user.images.create(image: res[:image], image_box_id: current_box.id)
        else
          Image.create(image: res[:image], image_box_id: current_box.id)
        end

        render json: { status: 200, image: res[:image] }
      else
        render json: { status:500, image: "作成に失敗しました" }
      end
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

  def checked_box(current_user)
    if current_user.image_box.present?
      current_box = current_user.image_box
    else
      current_box = current_user.is_guest? ? 
      current_user.create_image_box!(user_type: 0) : current_user.create_image_box!(user_type: 1)
    end

    if current_box.user_type == 0
      current_box.images.count >= 10 ? current_box.update(limit: true) : current_box.update(limit: false)
    else
      current_box.images.count >= 5 ? current_box.update(limit: true) : current_box.update(limit: false)
    end
    current_box
  end
end