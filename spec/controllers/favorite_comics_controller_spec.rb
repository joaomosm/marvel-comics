require 'rails_helper'

RSpec.describe FavoriteComicsController, type: :controller do

  describe '#index' do
    it 'returns all records' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe '#add_favorite' do
    it 'creates a new favorite record' do
      post :add_favorite, params: { comic_id: 1, title: 'le title' }
      expect(response).to have_http_status(:success)
    end
  end

  describe '#remove_favorite' do
    it 'deletes a favorite record' do
      favorite_comic = create(:favorite_comic)
      post :remove_favorite, params: { comic_id: favorite_comic.comic_id }
      expect(response).to have_http_status(:success)
    end
  end
end
