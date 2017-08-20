json.array! @seasons do |season|
  json.character_id season['character_id']
  json.season season['season']
  json.avg_episode_involvement season['avg_episode_involvement']
end
