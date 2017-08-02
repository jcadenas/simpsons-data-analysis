# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'CSV'

Character.destroy_all

character_csv_text = File.read("db/simpsons_data/simpsons_characters.csv")
character_csv = CSV.parse(character_csv_text, headers: true)
character_csv.each do |character|
  Character.create!(character.to_hash)
end
