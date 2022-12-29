class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def create
    if params[:registration][:current_id]
      current_user = User.find(params[:registration][:current_id])
      @dream_diaries = DreamDiary.where(user_id: current_user.id) if current_user.is_guest?
    end

    super

    if @dream_diaries.present?
      @dream_diaries.each do |diary|
        diary.update!(user_id: User.maximum(:id))
      end
    end
  end

  private

  def sign_up_params
    params.require(:registration).require(:data).permit(:email, :password, :password_confirmation, :name, :image, :introduction, :session, :is_guest)
  end
end
