class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies

  protect_from_forgery
  before_action :skip_session
  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?, :current_box

  def checked_box(current_user)
    if current_user
      current_box = current_user.image_box || current_user.create_image_box!(user_type: 1)
      current_box.images.count >= 5 ? current_box.update(limit: true) : current_box.update(limit: false)
      byebug
    else current_user == nil
      if session[:image_box_id]
        current_box = ImageBox.find(session[:image_box_id])
      else
        current_box = ImageBox.create
        session[:image_box_id] = current_box.id
      end
      current_box.images.count >= 3 ? current_box.update(limit: true) : current_box.update(limit: false)
    end
    current_box
  end

  protected

  def skip_session
    request.session_options[:skip] = true
  end
end
