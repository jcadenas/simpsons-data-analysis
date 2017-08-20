json.array! @episodes do |episode|
  json.ep_id episode['ep_id']
  json.title episode['title']
  json.imdb_rating episode['imdb_rating']
  json.character_id episode['character_id']
end
