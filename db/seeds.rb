# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'CSV'

# The below handled grooming
# CSV.open("db/simpsons_data/simpsons_episodes_groomed.csv", "w") do |csv_out|
#
#   CSV.foreach("db/simpsons_data/simpsons_episodes.csv") do |row|
#     csv_out << row.take(13)
#   end
#
# end


Character.destroy_all

character_csv_text = File.read("db/simpsons_data/simpsons_characters_groomed.csv")
character_csv = CSV.parse(character_csv_text.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8'), headers: true)
character_csv.each do |character|
  character_hash = character.to_hash
  character_hash['character_id'] = character_hash['id'].to_i
  character_hash.delete('id')
  Character.create!(character_hash)
end



Episode.destroy_all

episode_csv_text = File.read("db/simpsons_data/simpsons_episodes_groomed.csv")
episode_csv = CSV.parse(episode_csv_text.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8'), headers: true)
episode_csv.each do |episode|
  episode_hash = episode.to_hash
  episode_hash['ep_id'] = episode_hash['id'].to_i
  episode_hash.delete('id')
  episode_hash['season'] = episode_hash['season'].to_i
  episode_hash['number_in_season'] = episode_hash['number_in_season'].to_i
  episode_hash['number_in_series'] = episode_hash['number_in_series'].to_i
  episode_hash['us_viewers_in_millions'] = episode_hash['us_viewers_in_millions'].to_f
  episode_hash['views'] = episode_hash['views'].to_i
  episode_hash['imdb_rating'] = episode_hash['imdb_rating'].to_f
  episode_hash['imdb_votes'] = episode_hash['imdb_votes'].to_f
  Episode.create!(episode_hash)
end
