class Comic
  include ActiveModel::Model

  attr_accessor :id, :title, :modified, :dates, :thumbnail

  def initialize(params)
    @id = params['id']
    @title = params['title']
    @modified = params['modified']
    @dates = params['dates']
    @thumbnail =  params['thumbnail']
  end
end