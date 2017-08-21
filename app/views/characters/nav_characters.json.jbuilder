json.array! @characters do |character|
  json.character_id character['character_id']
  json.normalized_name character['normalized_name']
  json.gender character['gender']
  json.line_count character['line_count']
end
