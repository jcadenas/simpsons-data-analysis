
-- Top characters by spoken line count
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
