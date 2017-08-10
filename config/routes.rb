Rails.application.routes.draw do
  root to: 'static_pages#root'

  get '/api/charts/top_characters', to: 'charts#top_characters', defaults: { format: :json }

end
