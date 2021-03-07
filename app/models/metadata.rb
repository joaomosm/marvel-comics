class Metadata
  include ActiveModel::Model

  attr_accessor :offset, :limit, :total, :count

  def initialize(params)
    @offset = params['offset']
    @limit = params['limit']
    @total = params['total']
    @count =  params['count']
  end
end
