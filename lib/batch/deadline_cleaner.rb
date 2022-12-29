class Batch::DeadlineCleaner
  def self.image_box_data_reset
    ImageBox.all.destroy_all
  end
  def self.guest_user_data_reset
    User.where(is_guest: true).destroy_all
  end
end