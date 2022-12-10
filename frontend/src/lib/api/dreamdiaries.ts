import { client } from "./client"
import Cookies from "js-cookie"
import { DreamDiaryFormData } from "../../interfaces"

// indexへのgetリクエスト、全件取得
export const getDreamDiaries = () => {
  return client.get("dream_diaries", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
  })
}

// showとeditへのgetリクエスト、idに該当する1件取得
export const getDreamDiary = (id: number) => {
  return client.get(`dream_diaries/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
  })
}

//createへのpostリクエスト、newから
export const DreamDiaryCreate = (data: DreamDiaryFormData) => {
  return client.post("dream_diaries", data )
}

// updateへのputリクエスト、editから
export const DreamDiaryUpdate = (id: number, data: DreamDiaryFormData) => {
  return client.put(`dream_diaries/${id}`, data)
}

// destroyへのdeleteリクエスト
export const DreamDiaryDestroy = (id: number | undefined) => {
  return client.delete(`dream_diaries/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}