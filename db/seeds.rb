# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'CSV'
require 'fileutils'
require 'tempfile'

Character.destroy_all

# t_file = Tempfile.new('temp.txt')
# File.open("db/simpsons_data/simpsons_characters.csv", 'r') do |f|
# f.each_line{|line| t_file.puts line.chomp.sub(/,$/,'') }
#     end
# t_file.close
# FileUtils.mv(t_file.path, "/path/to/csv")

CSV.open("db/simpsons_data/simpsons_characters.csv").each do |row|
  puts row.take(3)
end
character_csv_text = File.read("db/simpsons_data/simpsons_characters.csv")
character_csv = CSV.parse(character_csv_text.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8'), headers: true)
character_csv.each do |character|
  Character.create!(character.to_hash)
end
