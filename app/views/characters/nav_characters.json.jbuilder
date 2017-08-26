@characters.each do |character|
  character_model = Character.find_by(character_id: character['character_id'])
  json.set! character['character_id'] do
    json.character_id character['character_id']
    json.normalized_name character['normalized_name']
    json.gender character['gender']
    json.line_count character['line_count']
    json.random_script_line character_model.script_lines.sample.raw_text
  end
end
