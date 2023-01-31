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
    res = @client.update_with_media("#{Time.now}", img)
    display_url = res.media[0].display_url.to_s

    return display_url
  end
end