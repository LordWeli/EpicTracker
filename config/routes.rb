Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :dashboard do
    root to: "library#index"
  end

  namespace :epic_games do
    get "library", to: "library#index"
  end

  namespace :howlongtobeat do
    get "game", to: "game_times#show"
  end
end
