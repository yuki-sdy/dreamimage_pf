import { client } from "./client"
import Cookies from "js-cookie"
import { Like } from "../../interfaces"

// いいねを作成
export const createLike= (data: Like, dreamDiariesId: number | undefined) => {
  return client.post(`dream_diaries/${dreamDiariesId}/likes`, data)
}

// いいねを削除
export const destroyLike= (dreamDiariesId: number | undefined, id: number | undefined) => {
  return client.delete(`dream_diaries/${dreamDiariesId}/likes/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}