# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'CSV'

character_genders_csv_text = File.read('./simpsons_data/character_genders.csv')
character_genders_csv = CSV.parse(character_genders_csv_text, headers: true)
