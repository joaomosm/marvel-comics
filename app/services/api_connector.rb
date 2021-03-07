require 'net/http'

class APIConnector

  def perform_request(uri, params)
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri)
    JSON.parse(res.body)
  end
end
