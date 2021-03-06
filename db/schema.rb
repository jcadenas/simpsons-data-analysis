# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170803013629) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.integer  "character_id"
    t.string   "normalized_name"
    t.string   "gender"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "episodes", force: :cascade do |t|
    t.integer  "ep_id"
    t.string   "title"
    t.string   "original_air_date"
    t.string   "production_code"
    t.integer  "season"
    t.integer  "number_in_season"
    t.integer  "number_in_series"
    t.float    "us_viewers_in_millions"
    t.integer  "views"
    t.float    "imdb_rating"
    t.integer  "imdb_votes"
    t.string   "image_url"
    t.string   "video_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", force: :cascade do |t|
    t.integer  "loc_id"
    t.string   "name"
    t.string   "normalized_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "script_lines", force: :cascade do |t|
    t.integer  "script_line_id"
    t.integer  "episode_id"
    t.integer  "number"
    t.string   "raw_text"
    t.integer  "timestamp_in_ms"
    t.boolean  "speaking_line"
    t.integer  "character_id"
    t.integer  "location_id"
    t.string   "raw_character_text"
    t.string   "raw_location_text"
    t.string   "spoken_words"
    t.string   "normalized_text"
    t.integer  "word_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
