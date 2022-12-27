require File.expand_path(File.dirname(__FILE__) + '/environment')

set      :job_template, "/bin/zsh -l -c ':job'"
job_type :rake, "source /Users/yanagisawayuki/.zshrc; export PATH=\"$HOME/.rbenv/bin:$PATH\"; eval \"$(rbenv init -)\"; cd :path && RAILS_ENV=:environment bundle exec rake :task :output"

rails_env = ENV['RAILS_ENV'] || :development
set :environment, rails_env
set :output, "#{Rails.root}/log/cron.log"

every 1.days, at: '0:00 am' do
  runner 'Batch::DeadlineCleaner.image_box_data_reset'
end