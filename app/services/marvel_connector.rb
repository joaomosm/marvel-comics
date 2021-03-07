require 'net/http'

class MarvelConnector
  attr_reader :params

  DEFAULT_GATEWAY = 'http://gateway.marvel.com/v1/public/'

  def get_comics(options = {}, extra_params = {})
    uri = URI(DEFAULT_GATEWAY + '/comics')
    params = generate_params(options, extra_params)
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    json = JSON.parse(res.body)
    comics = json['data']['results'].map{ |comic| Comic.new(comic) }
    metadata = Metadata.new(json['data'])
    {
      comics: comics,
      metadata: metadata
    }
  end

  def get_comics_by_character(options = {})
    uri = URI(DEFAULT_GATEWAY + '/characters')
    params = generate_params(options)
    params.merge!(name: options[:name])
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    json = JSON.parse(res.body)
    if json['data']['results'].present?
      character_id = json['data']['results'].first["id"]
      get_comics(options, { characters: character_id })
    else
      {
        comics: [],
        metadata: {}
      }
    end
  end

  def generate_hash(timestamp)
    private_key = ENV['MARVEL_API_PRIVATE_KEY']
    public_key = ENV['MARVEL_API_PUBLIC_KEY']
    raw_string = timestamp + private_key + public_key
    Digest::MD5.hexdigest(raw_string)
  end

  def generate_params(options, extra_params = {})
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
      offset: offset,
      **extra_params
    }
  end
end