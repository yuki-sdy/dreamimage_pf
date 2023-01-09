// railsAPIから情報を取ってくる

import applyCaseMiddleware from "axios-case-converter"
import axios from "axios";

const options = {
  ignoreHeaders: true 
}

export const client = applyCaseMiddleware(axios.create({
  // baseURL: "http://localhost:3010/api/v1"
  baseURL: "https://dreamdiary.magia.runteq.jp/api/v1"
}), options)
