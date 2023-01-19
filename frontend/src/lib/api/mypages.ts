import { client } from "./client"
import Cookies from "js-cookie"

// showへのgetリクエスト、ユーザーの日記を取得
export const getMypage = () => {
  return client.get("mypages", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
  })
}
