Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'
  resources :tasks # I don't need to add ":update" for drag-and-drop to work in this case
end
