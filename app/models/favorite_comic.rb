class FavoriteComic < ApplicationRecord

  validates_presence_of :comic_id
  validates_uniqueness_of :comic_id
  validates_presence_of :title

end
