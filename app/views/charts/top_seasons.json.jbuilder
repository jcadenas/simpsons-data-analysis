json.array! @seasons do |season|
  json.season season['season']
  json.avg_ep_imdb_rating season['avg_ep_imdb_rating']
end
