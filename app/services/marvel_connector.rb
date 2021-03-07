require 'net/http'

class MarvelConnector
  attr_reader :params

  DEFAULT_GATEWAY = 'http://gateway.marvel.com/v1/public/'

  def get_comics(options = {})
    uri = URI(DEFAULT_GATEWAY + '/comics')
    params = generate_params(options)
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    json = JSON.parse(res.body)
    comics = json['data']['results'].map{ |comic| Comic.new(comic) }
    {
      comics: comics
    }
  end

  def generate_hash(timestamp)
    private_key = ENV['MARVEL_API_PRIVATE_KEY']
    public_key = ENV['MARVEL_API_PUBLIC_KEY']
    raw_string = timestamp + private_key + public_key
    Digest::MD5.hexdigest(raw_string)
  end

  def generate_params(options)
    timestamp = Time.now.to_i.to_s
    api_key = ENV['MARVEL_API_PUBLIC_KEY']
    hash = generate_hash(timestamp)

    limit = options[:limit] || 20
    order_by = options[:order] || '-focDate'
    offset = options[:offset] || 0
    
    {
      ts: timestamp,
      apikey: api_key,
      hash: hash,
      limit: limit,
      orderBy: order_by,
      offset: offset
    }
  end
end