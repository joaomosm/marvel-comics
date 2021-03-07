class ComicsController < ActionController::API

  def index
    data = MarvelConnector.new.get_comics(options_params)
    render json: data, status: :ok
  end

  def get_by_character
    data = MarvelConnector.new.get_comics_by_character(options_params)
    render json: data, status: :ok
  end

  private

  def options_params
    params.slice(:limit, :offset, :order, :name)
  end
end
