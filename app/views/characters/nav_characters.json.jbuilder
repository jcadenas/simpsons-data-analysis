@characters.each do |character|
  json.set! character['character_id'] do
    json.character_id character['character_id']
    json.normalized_name character['normalized_name']
    json.gender character['gender']
    json.line_count character['line_count']
  end
end
