Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root "top#index"
    end
  end
end
