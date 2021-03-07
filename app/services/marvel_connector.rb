class MarvelConnector < APIConnector

  DEFAULT_GATEWAY = 'http://gateway.marvel.com/v1/public'

  def get_comics(options = {})
    uri = URI(DEFAULT_GATEWAY + '/comics')
    params = comics_params(options)
    
    json = perform_request(uri, params)
    comics = json['data']['results'].map{ |comic| Comic.new(comic) }
    metadata = Metadata.new(json['data'])
    {
      comics: comics,
      metadata: metadata
    }
  end

  def get_comics_by_character(options = {})
    uri = URI(DEFAULT_GATEWAY + '/characters')
    params = character_params(options)
    
    json = perform_request(uri, params)
    if json['data']['results'].present?
      character_id = json['data']['results'].first["id"]
      get_comics(options.merge({ characters: character_id }))
    else
      {
        comics: [],
        metadata: {}
      }
    end
  end

  def comics_params(options)
    {
      **default_params,
      limit: options[:limit],
      orderBy: options[:order],
      offset: options[:offset],
      characters: options[:characters]
    }.compact
  end

  def character_params(options)
    {
      **default_params,
      name: options[:name]
    }
  end

  def default_params
    timestamp = Time.now.to_i.to_s
    api_key = ENV['MARVEL_API_PUBLIC_KEY']
    hash = generate_hash(timestamp)
    {
      ts: timestamp,
      apikey: api_key,
      hash: hash,
    }
  end
  
  def generate_hash(timestamp)
    private_key = ENV['MARVEL_API_PRIVATE_KEY']
    public_key = ENV['MARVEL_API_PUBLIC_KEY']
    raw_string = timestamp + private_key + public_key
    Digest::MD5.hexdigest(raw_string)
  end
end
