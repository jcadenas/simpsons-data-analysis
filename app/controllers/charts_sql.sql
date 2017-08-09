SELECT
character_id, COUNT(id) as line_count
FROM
script_lines
GROUP BY
character_id
ORDER BY
COUNT(id) desc
LIMIT 30;
