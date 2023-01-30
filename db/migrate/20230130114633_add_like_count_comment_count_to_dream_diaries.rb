class AddLikeCountCommentCountToDreamDiaries < ActiveRecord::Migration[6.1]
  def change
    add_column :dream_diaries, :like_count, :integer, default: 0
    add_column :dream_diaries, :comment_count, :integer, default: 0
  end
end
