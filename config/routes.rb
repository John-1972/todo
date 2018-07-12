Rails.application.routes.draw do
  devise_for :users
  
  root 'static_pages#index'
  
  resources :todolists do
    resources :tasks # 'tasks' is now nested within 'todolists'
  end
end
