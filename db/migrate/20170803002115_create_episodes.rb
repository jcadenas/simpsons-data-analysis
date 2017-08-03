class CreateEpisodes < ActiveRecord::Migration
  def change
    create_table :episodes do |t|
      t.integer :ep_id
      t.string :title
      t.string :original_air_date
      t.string :production_code
      t.integer :season
      t.integer :number_in_season
      t.integer :number_in_series
      t.float :us_viewers_in_millions
      t.integer :views
      t.float :imdb_rating
      t.integer :imdb_votes
      t.string :img_url
      t.string :video_url

      t.timestamps

    end
  end
end
