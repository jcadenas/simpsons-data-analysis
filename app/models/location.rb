class Location < ActiveRecord::Base

  def self.top_locations(character_id)
    query = sanitize_sql([<<-SQL, character_id])
    SELECT
      locations.loc_id, locations.name, COUNT(script_lines.id) AS line_count
    FROM
      locations
    JOIN
      script_lines ON locations.loc_id = script_lines.location_id
    WHERE
      script_lines.character_id = ?
    GROUP BY
      locations.loc_id, locations.name
    ORDER BY
      COUNT(script_lines.id) DESC
    LIMIT 30;
    SQL

    connection.execute(query)
  end

end
