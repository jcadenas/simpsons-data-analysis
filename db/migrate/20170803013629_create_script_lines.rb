class CreateScriptLines < ActiveRecord::Migration
  def change
    create_table :script_lines do |t|
      t.integer :script_line_id
      t.integer :episode_id
      t.integer :number
      t.string :raw_text
      t.integer :timestamp_in_ms
      t.boolean :speaking_line
      t.integer :character_id
      t.integer :location_id
      t.string :raw_character_text
      t.string :raw_location_text
      t.string :spoken_words
      t.string :normalized_text
      t.integer :word_count

      t.timestamps

    end
  end
end
