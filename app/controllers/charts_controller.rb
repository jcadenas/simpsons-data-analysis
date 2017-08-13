require 'json'

class ChartsController < ApplicationController

  def top_characters

    @top_characters = ActiveRecord::Base.connection.execute(<<-SQL)
    SELECT
      script_lines.character_id, characters.normalized_name, COUNT(script_lines.id) as line_count
    FROM
      script_lines
    JOIN
      characters ON script_lines.character_id = characters.character_id
    GROUP BY
      script_lines.character_id, characters.normalized_name
    ORDER BY
      COUNT(script_lines.id) desc
    LIMIT 15
    SQL

    @top_characters = JSON.parse(@top_characters.to_json)
    render :top_characters

  end

  def top_episodes

    @top_episodes = ActiveRecord::Base.connection.execute(<<-SQL)
    SELECT
      ep_id, title, imdb_rating, original_air_date, season, number_in_season, us_viewers_in_millions
    FROM
      episodes
    ORDER BY
      imdb_rating DESC, original_air_date
    LIMIT 30;
    SQL

    @top_episodes = JSON.parse(@top_episodes.to_json)
    render :top_episodes

  end

end
