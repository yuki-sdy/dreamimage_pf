import { client } from "./client"
import Cookies from "js-cookie"
import { BookmarkData } from "../../interfaces"

// お気に入りを作成
export const createBookmark= (data: BookmarkData, dreamDiariesId: number | undefined) => {
  return client.post(`dream_diaries/${dreamDiariesId}/bookmarks`, data)
}

// お気に入りを削除
export const destroyBookmark= (dreamDiariesId: number | undefined, id: number | undefined) => {
  return client.delete(`dream_diaries/${dreamDiariesId}/bookmarks/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}