class Api::V1::Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  protected

  def handle_new_resource
    @oauth_registration = true
    # don't set password
    # set_random_password
  end
end