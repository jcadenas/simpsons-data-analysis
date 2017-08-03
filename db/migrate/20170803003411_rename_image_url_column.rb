class RenameImageUrlColumn < ActiveRecord::Migration
  def change
    rename_column :episodes, :img_url, :image_url
  end
end
