require 'rails_helper'

RSpec.describe FavoriteComic, type: :model do

  it 'must have a comic_id' do
    favorite_comic = build(:favorite_comic, comic_id: nil)
    expect(favorite_comic).to_not be_valid
  end

  it 'must have a unique comic_id' do
    favorite_comic = create(:favorite_comic, comic_id: 1)
    repeated_favorite_comic = build(:favorite_comic, comic_id: 1)
    expect(favorite_comic).to be_valid
    expect(repeated_favorite_comic).to_not be_valid
  end

  it 'must have a title' do
    favorite_comic = build(:favorite_comic, title: nil)
    expect(favorite_comic).to_not be_valid
  end

end
