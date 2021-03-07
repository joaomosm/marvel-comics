Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :comics, only: [:index] do
    get :get_by_character, on: :collection
  end

  resources :favorite_comics, only: [:index] do
    post :add_favorite, on: :collection
    post :remove_favorite, on: :collection
  end
end
