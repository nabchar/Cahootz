Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index, :update]
    resource :session, only: [:create, :destroy]

    resources :channels, only: [:index, :show, :create, :update, :delete, :destroy] do
      resources :messages, only: [:index, :create]
    end
    resources :messages, only: [:update, :destroy]
    resources :subscriptions, only: [:create, :index, :destroy]

    resources :direct_messages, only: [:index, :create]
  end
end
