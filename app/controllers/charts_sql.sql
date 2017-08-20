-- Top Characters by spoken line count
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
LIMIT 30;


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
  episodes.ep_id, episodes.title, script_lines.character_id, script_lines.raw_character_text, episode_line_count.total_ep_line_count
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
































-- Bottom of File
