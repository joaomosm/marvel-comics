class FavoriteComicsController < ActionController::API

  def index
    render json: FavoriteComic.all.pluck(:comic_id), status: :ok
  end
  
  def add_favorite
    favorite_comic = FavoriteComic.new(favorite_comic_params)
    if favorite_comic.save
      render json: true, status: :ok
    else
      render json: false, status: :unprocessable_entity
    end
  end
  
  def remove_favorite
    favorite_comic = FavoriteComic.find_by(comic_id: favorite_comic_params[:comic_id])
    if favorite_comic.delete
      render json: true, status: :ok
    else
      render json: false, status: :unprocessable_entity
    end
  end

  private

  def favorite_comic_params
    params.permit(:comic_id, :title)
  end
end
