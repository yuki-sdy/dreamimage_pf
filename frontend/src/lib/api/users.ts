import { client } from "./client"
import Cookies from "js-cookie"

// 退会処理
export const deleteAccount = (id: number | undefined) => {
  return client.delete(`users/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}