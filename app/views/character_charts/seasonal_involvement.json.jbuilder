json.array! @seasons do |season|
  json.season season['season']
  json.character_id season['character_id']
  json.character_season_involvement season['character_season_involvement']
end
