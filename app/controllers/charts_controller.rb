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
      imdb_rating DESC, us_viewers_in_millions DESC
    LIMIT 15;
    SQL

    @top_episodes = JSON.parse(@top_episodes.to_json)
    render :top_episodes

  end

  def top_seasons

    @top_seasons = ActiveRecord::Base.connection.execute(<<-SQL)
    SELECT
      season, AVG(imdb_rating) AS avg_ep_imdb_rating
    FROM
      episodes
    GROUP BY
      season
    ORDER BY
      AVG(imdb_rating) DESC
    LIMIT 15;
    SQL

    @top_seasons = JSON.parse(@top_seasons.to_json)
    render :top_seasons

  end

  def top_locations

    @top_locations = ActiveRecord::Base.connection.execute(<<-SQL)
    SELECT
      locations.loc_id, locations.name, COUNT(script_lines.id) AS line_count
    FROM
      script_lines
    JOIN
      locations ON script_lines.location_id = locations.loc_id
    GROUP BY
      locations.loc_id, locations.name
    ORDER BY
      COUNT(script_lines.id) DESC
    LIMIT 15;
    SQL

    @top_locations = JSON.parse(@top_locations.to_json)
    render :top_locations

  end




end
