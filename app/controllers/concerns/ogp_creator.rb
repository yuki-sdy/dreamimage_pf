require 'mini_magick'
require 'base64'

class OgpCreator

  BASE_IMAGE_PATH = './app/assets/images/samplememo.png'
  GRAVITY = 'center'
  TEXT_POSITION = '0,0'
  FONT = './app/assets/fonts/pugnomincho-mini.ttf'
  FONT_SIZE = 65
  INDENTION_COUNT = 16 #
  BODY_INDENTION_COUNT = 15 #
  ROW_LIMIT = 8

  def self.build(title, body, content, prompt, image, impression, type, date)

    # 生成したbase64画像をデコードして取得
    metadata = "data:image/png;base64,"
    base64_string = image[metadata.size..-1]
    blob = Base64.decode64(base64_string)
    image = MiniMagick::Image.read(blob)
    # image = image.combine_options do |c|
    #   c.resize '300x300'
    # end
    image.write 'image.png'
    
    # 背景画像と重ねる
    base_image = MiniMagick::Image.open(BASE_IMAGE_PATH)
    result = base_image.composite(MiniMagick::Image.open('image.png')) do |config|
      config.compose 'Over'
      config.gravity 'NorthEast'
      config.geometry '+50+80'#位置調整
    end

    title = prepare_text(title)
    content = prepare_text(content)
    prompt = prepare_text(prompt)
    # 「○年○月○日(お昼寝)・普通の夢」みたいにしたい

    result.combine_options do |config|
      config.font FONT
      config.fill 'black'
      config.gravity GRAVITY
      config.pointsize FONT_SIZE
      config.draw "text -400, -450 '#{title}'"
      config.draw "text 400, 450 '#{content}'"
      insert_vertical_word(body, 600, 200, FONT_SIZE, config)
    end
  end
  
  
  private
  
  def self.insert_vertical_word(word, x, y, fontsize, config)
    words = word.chars.each_slice(BODY_INDENTION_COUNT).to_a
    fix_x = x
    words.each_with_index do |w, i|
      if i >= 1
        fix_x -= fontsize 
      end
      w.each_with_index do |c, i|
        if c == "\n"
          fix_y += fontsize
        elsif c == "ー" || c == "…"
          config.gravity 'SouthWest'
          config.rotate -90
          config.draw "text #{y + i * fontsize + fontsize / 4},#{fix_x - fontsize / 5} '#{c}'"
          config.rotate 90
        elsif c == "、" || c == "。"
          config.gravity 'SouthEast'
          config.rotate -180
          config.draw "text #{fix_x},#{y + i * fontsize} '#{c}'"
          config.rotate 180
        else
          config.gravity 'NorthWest'
          config.draw "text #{fix_x},#{y + i * fontsize} '#{c}'"
        end
      end
    end
  end

  def self.prepare_text(text)
    text.to_s.scan(/.{1,#{INDENTION_COUNT}}/)[0...ROW_LIMIT].join("\n")
  end
end