class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies

  # protect_from_forgery
  # before_action :skip_session
  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?, :current_box

  protected

  # def skip_session
  #   request.session_options[:skip] = true
  # end
end
