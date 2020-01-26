Rails.application.routes.draw do
  root 'pages#index'
  namespace :api , defaults: { format: "json" } do
    namespace :v1 do
      get "games/new", to: "games#new"
      get "games/word/check/:word", to: "games#word_check"
    end
  end    
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
