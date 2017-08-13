Rails.application.routes.draw do
  root to: 'static_pages#root'

  get '/api/charts/top_characters', to: 'charts#top_characters', defaults: { format: :json }
  get '/api/charts/top_episodes', to: 'charts#top_episodes', defaults: { format: :json }
  get '/api/charts/top_seasons', to: 'charts#top_seasons', defaults: { format: :json }
  get '/api/charts/top_locations', to: 'charts#top_locations', defaults: { format: :json }
  get '/api/charts/seasons_by_imdb_rating', to: 'charts#seasons_by_imdb_rating', defaults: { format: :json }

end
