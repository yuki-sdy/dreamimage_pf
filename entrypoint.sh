#!/bin/sh
set -e

# 自分のアプリに合わせて必要なコマンドを修正してください
bin/rails db:migrate
bundle exec whenever --update-crontab

rm -f tmp/pids/server.pid && bin/rails s