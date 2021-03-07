class ComicsController < ActionController::API

  def index
    data = MarvelConnector.new.get_comics
    render json: data, status: :ok
  end

  private

  def options_params
    params.slice(:limit, :offset, :order, :name)
  end
end
