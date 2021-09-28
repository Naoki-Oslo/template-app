Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts
      resources :users
      resources :categories, only: %i[index]
      resources :comments
      resources :likes
      resources :favorites
      
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end