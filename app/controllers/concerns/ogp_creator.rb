require 'mini_magick'
require 'base64'

class OgpCreator

  BASE_IMAGE_PATH = './public/images/dreamdiary.png'
  GRAVITY = 'center'
  TEXT_POSITION = '0,0'
  FONT = './public/fonts/timemachine-wa.ttf'
  INDENTION_COUNT = 20
  PROMPT_INDENTION_COUNT = 30
  BODY_INDENTION_COUNT = 25
  ROW_LIMIT = 8

  def self.build(title, body, content, prompt, image, impression, type, date)
    
    # 生成画像と背景画像を重ねる
    decode_image(image)
    base_image = MiniMagick::Image.open(BASE_IMAGE_PATH)
    result = base_image.composite(MiniMagick::Image.open('image.png')) do |config|
      config.compose 'Over'
      config.gravity 'NorthEast'
      config.geometry '+60+140'#位置調整
    end

    title = prepare_text(title, INDENTION_COUNT)
    content = prepare_text(content, INDENTION_COUNT)
    prompt = prepare_text(prompt, PROMPT_INDENTION_COUNT)
    type = type_enum(type)
    impression = impression_enum(impression)
    date = date.strftime("%Y年%m月%d日")

    # 文字を重ねる
    result.combine_options do |config|
      config.font FONT
      config.fill 'black'
      config.gravity GRAVITY
      config.pointsize 35
      config.draw "text -135, -485 '#{title}'"
      config.pointsize 25
      config.draw "text 390, -500 '#{date}'"
      config.draw "text 390, -460 '#{type}・#{impression}'"
      config.draw "text 150, 430 '#{content}'"
      config.draw "text 150, 325 '「#{prompt}」'"
      config.pointsize 35
      insert_vertical_word(body, 205, 175, 35, config)
    end
  end
  
  
  private

  def self.decode_image(image)
    metadata = "data:image/png;base64,"
    base64_string = image[metadata.size..-1]
    blob = Base64.decode64(base64_string)
    image = MiniMagick::Image.read(blob)
    image = image.combine_options do |c|
      c.resize '710x710'
    end
    image.write 'image.png'
  end


  # INDENTION_COUNTで改行する処理
  def self.prepare_text(text, indention_count)
    text.to_s.scan(/.{1,#{indention_count}}/)[0...ROW_LIMIT].join("\n")
  end
  
  # 縦書きにする処理
  def self.insert_vertical_word(word, x, y, fontsize, config)
    words = word.chars.each_slice(BODY_INDENTION_COUNT).to_a
    fix_x = x
    words.each_with_index do |w, i|
      if i >= 1
        fix_x -= fontsize + 11
      end
      w.each_with_index do |c, i|
        if c == "ー" || c == "…" || c == "〜"
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

  def self.type_enum(type)
    case type
    when 0
      type_fix = "就寝"
    when 1
      type_fix = "昼寝"
    when 2
      type_fix = "うたた寝"
    end
    return type_fix
  end

  def self.impression_enum(impression)
    case impression
    when 0
      impression_fix = "普通の夢"
    when 1
      impression_fix = "良い夢"
    when 2
      impression_fix = "悪夢"
    when 3
      impression_fix = "明晰夢"
    end
    return impression_fix
  end
end