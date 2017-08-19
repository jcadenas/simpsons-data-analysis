require 'json'

class CharacterChartsController < ApplicationController

  def most_involved_episodes
    character_id = params[:character_id].to_i

    @episodes = Episode.most_involved_episodes(character_id)
    @episodes = JSON.parse(@episodes.to_json)
    render :most_involved_episodes

  end



end
