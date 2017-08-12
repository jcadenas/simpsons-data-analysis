# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'CSV'


# How to Clean CSV
# -  Read CSV into string with File.read()
# -  Remove all "s from resulting string with new_s = script_string.gsub /"/, ''
# -  Remove all 's from resulting string with new_s = script_string.gsub /'/, ''
# -  Remove all ", "s from resulting string with new_s = script_string.gsub ", ", ' '
# -  Write a new groomed csv file with the string File.write('foo.txt', 'bar')

# CLEANING TEMPLATE --------------------------------------------
# require 'CSV'
# csv_text = File.read("db/simpsons_data/simpsons_characters.csv")
# q
# no_quotes = csv_text.gsub /"/, ''
# q
# no_apostrophes = no_quotes.gsub /'/, ''
# q
# no_commas = no_apostrophes.gsub ", ", ' '
# q
# File.write('db/simpsons_data/simpsons_characters_groomed_II.csv', no_commas)

# Handy for lingering commas resulting in setting '' equal to something when seeding
# CSV.open("db/simpsons_data/simpsons_locations_groomed_II.csv", "w") do |csv_out|
#   CSV.foreach("db/simpsons_data/simpsons_locations_groomed.csv") do |row|
#     csv_out << row.take(3)  #enter required number of columns here
#   end
# end

# --------------------------------------------------------------




# script_line_csv_text = File.read("db/simpsons_data/simpsons_script_lines.csv")
# script_line_text_groomed = script_line_csv_text.gsub /"/, ''
# script_line_csv = CSV.parse(script_line_text_groomed.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8'), headers: true)


# new_s = script_string.gsub /"/, ''
#
# script_csv_arrays = CSV.read("db/simpsons_data/simpsons_script_lines.csv")
#
# script_csv_arrays.each do |script_line|
#   next if script_line[0] = "id"
#   script_row_objects << CSV::Row.new(script_headers, script_line, header_row = false)
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

Location.destroy_all

location_csv_text = File.read("db/simpsons_data/simpsons_locations_groomed_II.csv")
location_csv = CSV.parse(location_csv_text.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8'), headers: true)
location_csv.each do |location|
  location_hash = location.to_hash
  location_hash['loc_id'] = location_hash['id'].to_i
  location_hash.delete('id')
  Location.create!(location_hash)
end

ScriptLine.destroy_all

# script_string = File.read("db/simpsons_data/simpsons_script_lines.csv")
# less_quotes = script_string.gsub /"/, ''
# less_commas_quotes = less_quotes.gsub ', ', ' '
# File.write('db/simpsons_data/simpsons_script_lines_sans_commas_quotes.csv', less_commas_quotes)

script_line_csv_text = File.read("db/simpsons_data/simpsons_script_lines_groomed.csv")
script_line_csv = CSV.parse(script_line_csv_text.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8'), headers: true)
script_line_csv.each do |script_line|
  script_line_hash = script_line.to_hash
  script_line_hash['script_line_id'] = script_line_hash['id'].to_i
  script_line_hash.delete('id')
  script_line_hash['episode_id'] = script_line_hash['episode_id'].to_i
  script_line_hash['number'] = script_line_hash['number'].to_i
  script_line_hash['timestamp_in_ms'] = script_line_hash['timestamp_in_ms'].to_i
  script_line_hash['character_id'] = script_line_hash['character_id'].to_i
  script_line_hash['location_id'] = script_line_hash['location_id'].to_i
  script_line_hash['word_count'] = script_line_hash['word_count'].to_i
  ScriptLine.create!(script_line_hash)
end
