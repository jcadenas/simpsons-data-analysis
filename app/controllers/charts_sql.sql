-- Top Characters by spoken line count
SELECT
  script_lines.character_id, characters.normalized_name, COUNT(script_lines.id) as line_count
FROM
  script_lines
RIGHT JOIN
  characters ON script_lines.character_id = characters.character_id
WHERE
  characters.normalized_name LIKE '%itchy%'
GROUP BY
  script_lines.character_id, characters.normalized_name
ORDER BY
  COUNT(script_lines.id) desc
LIMIT 100;


-- Top Episodes by IMDB Rating
SELECT
  ep_id, title, imdb_rating, original_air_date, season, number_in_season, us_viewers_in_millions
FROM
  episodes
ORDER BY
  imdb_rating DESC, us_viewers_in_millions DESC
LIMIT 30;


-- Top Seasons by Avg Episode IMDB Rating
SELECT
  season, AVG(imdb_rating) AS avg_ep_imdb_rating
FROM
  episodes
GROUP BY
  season
ORDER BY
  AVG(imdb_rating) DESC
LIMIT 30;


-- Top Locations by Number of lines spoken
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
LIMIT 30;


-- Seasons by Avg IMDB Rating
SELECT
  season, AVG(imdb_rating) AS avg_ep_imdb_rating
FROM
  episodes
WHERE
  season < 27
GROUP BY
  season
ORDER BY
  season
LIMIT 30;

-- Most Involved Episodes given a character id
SELECT
  episodes.season,
  episodes.number_in_season,
  episodes.ep_id,
  episodes.title,
  script_lines.character_id,
  script_lines.raw_character_text,
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
  script_lines.character_id = 15
GROUP BY
  episodes.season,
  episodes.number_in_season,
  episodes.ep_id, episodes.title,
  script_lines.character_id,
  script_lines.raw_character_text,
  episode_line_count.total_ep_line_count
ORDER BY
  ROUND(COUNT(script_lines.id)/(episode_line_count.total_ep_line_count + 0.0), 3) DESC
LIMIT 30;

-- Line Count per Episode
SELECT
  script_lines.episode_id, COUNT(script_lines.id) AS line_count
FROM
  script_lines
GROUP BY
  script_lines.episode_id
ORDER BY
  COUNT(script_lines.id)
LIMIT 30;


-- Top Locations for a Character
SELECT
  locations.loc_id, locations.name, COUNT(script_lines.id) AS line_count
FROM
  locations
JOIN
  script_lines ON locations.loc_id = script_lines.location_id
WHERE
  script_lines.character_id = 8
GROUP BY
  locations.loc_id, locations.name
ORDER BY
  COUNT(script_lines.id) DESC
LIMIT 30;

-- Avg Involvement over All Seasons for a character
-- (Of episodes they are in, what is the avg percentage by season?)
SELECT
  involvment_by_episode.character_id,
  involvment_by_episode.season,
  AVG(involvment_by_episode.percent_of_lines) AS avg_episode_involvement
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
      script_lines.character_id = 2
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

-- Episode Appearances per Season (%)
SELECT
  season_ep_count.season,
  character_appearances.character_id,
  ROUND(character_appearances.character_episode_count/(season_ep_count.ep_count + 0.0), 3) AS character_season_involvement
FROM
  (
    SELECT
      episodes.season, script_lines.character_id, COUNT(DISTINCT(script_lines.episode_id)) AS character_episode_count
    FROM
      episodes
    JOIN
      script_lines ON episodes.ep_id = script_lines.episode_id
    WHERE
      script_lines.character_id = 12
    GROUP BY
      episodes.season, script_lines.character_id
    ORDER BY
      episodes.season
  ) AS character_appearances
JOIN
  (
    SELECT
      season, COUNT(ep_id) AS ep_count
    FROM
      episodes
    GROUP BY
      season
    ORDER BY
      season
  ) AS season_ep_count ON character_appearances.season = season_ep_count.season
ORDER BY
  season_ep_count.season
LIMIT 30;



-- Character Appearances per season
SELECT
  episodes.season, script_lines.character_id, COUNT(DISTINCT(script_lines.episode_id)) AS character_episode_count
FROM
  episodes
JOIN
  script_lines ON episodes.ep_id = script_lines.episode_id
WHERE
  script_lines.character_id = 18
GROUP BY
  episodes.season, script_lines.character_id
ORDER BY
  episodes.season
LIMIT 30;

-- Episode count per season
SELECT
  season, COUNT(ep_id) AS ep_count
FROM
  episodes
GROUP BY
  season
ORDER BY
  season;

-- Characters best episodes
SELECT
  episodes.ep_id, episodes.title, episodes.imdb_rating, script_lines.character_id
FROM
  episodes
JOIN
  script_lines ON episodes.ep_id = script_lines.episode_id
WHERE
  script_lines.character_id = 18
GROUP BY
  episodes.ep_id, episodes.title, episodes.imdb_rating, script_lines.character_id
ORDER BY
  episodes.imdb_rating DESC
LIMIT 30;



-- Homer saying d'oh
SELECT
  characters.character_id, COUNT(script_lines.id) AS doh_line_count
FROM
  characters
JOIN
  script_lines ON characters.character_id = script_lines.character_id
WHERE
  script_lines.character_id = 2
  AND
  (script_lines.normalized_text ILIKE '%d''oh%'
    OR script_lines.normalized_text ILIKE '%doh%'
    OR script_lines.normalized_text ILIKE '%d oh%'
  )
GROUP BY
  characters.character_id
LIMIT 10;























-- Bottom of File
