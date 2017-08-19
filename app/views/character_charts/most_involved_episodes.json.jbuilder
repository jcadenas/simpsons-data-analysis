json.array! @episodes do |episode|
  json.episode_id episode['ep_id']
  json.title episode['title']
  json.character_id episode['character_id']
  json.raw_character_text episode['raw_character_text']
  json.total_ep_line_count episode['total_ep_line_count']
  json.character_line_count episode['character_line_count']
  json.percent_of_lines episode['percent_of_lines']
end
