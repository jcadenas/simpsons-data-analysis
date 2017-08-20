require 'json'

class CharacterChartsController < ApplicationController

  def most_involved_episodes
    character_id = params[:character_id].to_i

    @episodes = Episode.most_involved_episodes(character_id)
    @episodes = JSON.parse(@episodes.to_json)
    render :most_involved_episodes

  end

  def top_locations
    character_id = params[:character_id].to_i

    @locations = Location.top_locations(character_id)
    @locations = JSON.parse(@locations.to_json)
    render :top_locations
  end

  def avg_ep_involvement_by_season
    character_id = params[:character_id].to_i

    @seasons = Episode.avg_ep_involvement_by_season(character_id)
    @seasons = JSON.parse(@seasons.to_json)
    render :avg_ep_involvement_by_season
  end


end
