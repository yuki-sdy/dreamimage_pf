require 'twitter'
require 'open-uri'

class TwitterShare
  def self.send(img_url)
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_API_KEY']
      config.consumer_secret     = ENV['TWITTER_SECRET_KEY']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_TOKEN_SECRET']
    end

    img = open(img_url)
    res = @client.update_with_media("", img)
    tweet_id = res.id.to_s

    return tweet_id
  end
end