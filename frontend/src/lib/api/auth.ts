import { client } from "./client"
import Cookies from "js-cookie"

import { SignInData, SignUpData } from "../../interfaces"

// サインアップ（新規アカウント作成）
export const signUp = (data: SignUpData, currentId?: number | undefined) => {
  return client.post("auth", {data, currentId})
}

// サインイン（ログイン）
export const signIn = (data: SignInData)  => {
  return client.post("auth/sign_in", data)
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}