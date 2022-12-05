// railsAPIのルートから取ってくる

import { client } from "./client"

export const Test = () => {
  return client.get("/")
}