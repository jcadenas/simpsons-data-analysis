json.array! @top_episodes do |episode|
  json.ep_id episode['ep_id']
  json.title episode['title']
  json.imdb_rating episode['imdb_rating']
  json.original_air_date episode['original_air_date']
  json.season episode['season']
  json.number_in_season episode['number_in_season']
  json.us_viewers_in_millions episode['us_viewers_in_millions']
end
