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
