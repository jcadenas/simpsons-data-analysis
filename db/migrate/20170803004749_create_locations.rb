class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :loc_id
      t.string :name
      t.string :normalized_name

      t.timestamps
    end
  end
end
