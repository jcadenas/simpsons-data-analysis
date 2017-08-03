class DropNameColumn < ActiveRecord::Migration
  def change
    remove_column :characters, :name
  end
end
