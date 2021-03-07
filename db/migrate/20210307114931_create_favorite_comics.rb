class CreateFavoriteComics < ActiveRecord::Migration[5.2]
  def change
    create_table :favorite_comics do |t|
      t.integer :comic_id
      t.string :title
      t.timestamps
    end
  end
end
