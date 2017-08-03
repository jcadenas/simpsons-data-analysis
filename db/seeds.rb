# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'CSV'
Character.destroy_all

# CSV.open("db/simpsons_data/simpsons_characters_groomed.csv", "w") do |csv_out|
#
#   CSV.foreach("db/simpsons_data/simpsons_characters.csv") do |row|
#     csv_out << row.take(3)
#   end
#
# end

character_csv_text = File.read("db/simpsons_data/simpsons_characters_groomed.csv")
character_csv = CSV.parse(character_csv_text.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8'), headers: true)
character_csv.each do |character|
  character_hash = character.to_hash
  character_hash['character_id'] = character_hash['id'].to_i
  character_hash.delete('id')
  Character.create!(character_hash)
end
