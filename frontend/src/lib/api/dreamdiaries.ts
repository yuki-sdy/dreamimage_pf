import { client } from "./client"
import Cookies from "js-cookie"
import { DreamDiaryFormData } from "../../interfaces"

// indexへのgetリクエスト、公開済み日記を全件取得
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

//previewへのpostリクエスト、newから
export const DreamDiaryPreview = (data: DreamDiaryFormData) => {
  return client.post("dream_diaries/preview", data )
}

//createへのpostリクエスト、previewから
export const DreamDiaryCreate = (data: DreamDiaryFormData, diaryOgp: string) => {
  return client.post("dream_diaries", {dreamDiary: data, diaryOgp: diaryOgp } )
}

//backへのpostリクエスト、previewから
export const DreamDiaryBack = (data: DreamDiaryFormData) => {
  return client.post("dream_diaries/back", data )
}

// updateへのputリクエスト、editから
export const DreamDiaryUpdate = (id: number, data: DreamDiaryFormData, diaryOgp: string) => {
  return client.put(`dream_diaries/${id}`, { dreamDiary: data, diaryOgp: diaryOgp })
}

// destroyへのdeleteリクエスト
export const DreamDiaryDestroy = (id: number | undefined) => {
  return client.delete(`dream_diaries/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}

// image#createへのpostリクエスト
export const ImageCreate = (prompts: string, id: number | undefined) => {
  return client.post("images/create", { prompts: prompts, user_id: id })
}