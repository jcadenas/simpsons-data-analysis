class CharactersController < ApplicationController

  def nav_characters
    @characters = ActiveRecord::Base.connection.execute(<<-SQL)
    SELECT
      script_lines.character_id, characters.normalized_name, characters.gender, COUNT(script_lines.id) as line_count
    FROM
      script_lines
    JOIN
      characters ON script_lines.character_id = characters.character_id
    GROUP BY
      script_lines.character_id, characters.normalized_name, characters.gender
    ORDER BY
      COUNT(script_lines.id) desc
    LIMIT 50
    SQL

    @characters = JSON.parse(@characters.to_json)
    render :nav_characters

  end

  def script_line
    @character = Character.find_by(character_id: params[:character_id])
    @script_line = @character.script_lines.sample.raw_text
    render :script_line
  end


end
