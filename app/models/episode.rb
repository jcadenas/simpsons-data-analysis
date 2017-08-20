class Episode < ActiveRecord::Base
  def self.most_involved_episodes(character_id)
    query = sanitize_sql([<<-SQL, character_id])
    SELECT
      episodes.ep_id,
      episodes.title,
      script_lines.character_id,
      episode_line_count.total_ep_line_count,
      COUNT(script_lines.id) AS character_line_count,
      ROUND(COUNT(script_lines.id)/(episode_line_count.total_ep_line_count + 0.0), 3) AS percent_of_lines
    FROM
      episodes
    JOIN
      script_lines ON episodes.ep_id = script_lines.episode_id
    JOIN
       (
       SELECT
         script_lines.episode_id, COUNT(script_lines.id) AS total_ep_line_count
       FROM
         script_lines
       GROUP BY
         script_lines.episode_id
       ORDER BY
         COUNT(script_lines.id)
       ) AS episode_line_count ON episode_line_count.episode_id = episodes.ep_id
    WHERE
      script_lines.character_id = ?
    GROUP BY
      episodes.ep_id, episodes.title, script_lines.character_id, episode_line_count.total_ep_line_count
    ORDER BY
      ROUND(COUNT(script_lines.id)/(episode_line_count.total_ep_line_count + 0.0), 3) DESC
    LIMIT 15;
    SQL

    connection.execute(query)
  end

  def self.avg_ep_involvement_by_season(character_id)
    query = sanitize_sql([<<-SQL, character_id])
    SELECT
      involvment_by_episode.character_id,
      involvment_by_episode.season,
      ROUND(AVG(involvment_by_episode.percent_of_lines), 3) AS avg_episode_involvement
    FROM
      (
        SELECT
          episodes.season,
          episodes.number_in_season,
          episodes.ep_id,
          episodes.title,
          script_lines.character_id,
          episode_line_count.total_ep_line_count,
          COUNT(script_lines.id) AS character_line_count,
          ROUND(COUNT(script_lines.id)/(episode_line_count.total_ep_line_count + 0.0), 3) AS percent_of_lines
        FROM
          episodes
        JOIN
          script_lines ON episodes.ep_id = script_lines.episode_id
        JOIN
           (
           SELECT
             script_lines.episode_id, COUNT(script_lines.id) AS total_ep_line_count
           FROM
             script_lines
           GROUP BY
             script_lines.episode_id
           ORDER BY
             COUNT(script_lines.id)
           ) AS episode_line_count ON episode_line_count.episode_id = episodes.ep_id
        WHERE
          script_lines.character_id = ?
        GROUP BY
          episodes.season, episodes.number_in_season, episodes.ep_id, episodes.title, script_lines.character_id, script_lines.raw_character_text, episode_line_count.total_ep_line_count
        ORDER BY
          ROUND(COUNT(script_lines.id)/(episode_line_count.total_ep_line_count + 0.0), 3) DESC
      ) AS involvment_by_episode
    GROUP BY
      involvment_by_episode.character_id,
      involvment_by_episode.season
    ORDER BY
      involvment_by_episode.season
    LIMIT 30;
    SQL

    connection.execute(query)
  end
end
