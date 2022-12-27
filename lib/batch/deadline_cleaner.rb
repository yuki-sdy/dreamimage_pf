class Batch::DeadlineCleaner
  def self.image_box_data_reset
    ImageBox.all.destroy_all
    puts 'reset'
  end
end