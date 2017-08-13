Rails.application.routes.draw do
  root to: 'static_pages#root'

  get '/api/charts/top_characters', to: 'charts#top_characters', defaults: { format: :json }
  get '/api/charts/top_episodes', to: 'charts#top_episodes', defaults: { format: :json }

end
