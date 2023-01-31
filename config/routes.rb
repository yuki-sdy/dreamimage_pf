Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      root "top#index"
      resources :users, only: %i[update destroy]
      resources :mypages, only: %i[index]

      resources :dream_diaries do
        post 'preview', on: :collection
        post 'back', on: :collection
        resources :likes, only: %i[create destroy]
        resources :bookmarks, only: %i[create destroy]
        resources :comments, only: %i[create destroy]
        get 'share', to: 'dream_diaries#share'
      end

      post 'images/create'
      get 'dream_diaries/:dream_diary_id/images', to: 'images#ogp', as: 'images_ogp'

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        passwords: 'api/v1/auth/passwords'
        # omniauth_callbacks: 'api/v1/auth/omniauth_callbacks',
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end

      mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

    end
  end
end
