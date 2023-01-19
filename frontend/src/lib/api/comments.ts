import { client } from "./client"
import Cookies from "js-cookie"
import { CommentData } from "../../interfaces"

// コメントを作成
export const createComment= (data: CommentData, dreamDiariesId: number | undefined) => {
  return client.post(`dream_diaries/${dreamDiariesId}/comments`, data)
}

// コメントを更新
export const updateComment= (data: CommentData, dreamDiariesId: number | undefined, id: number | undefined) => {
  return client.put(`dream_diaries/${dreamDiariesId}/comments/${id}`, data)
}

// コメントを削除
export const destroyComment= (dreamDiariesId: number | undefined, id: number | undefined) => {
  return client.delete(`dream_diaries/${dreamDiariesId}/comments/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}