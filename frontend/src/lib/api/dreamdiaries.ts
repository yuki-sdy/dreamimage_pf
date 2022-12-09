import { client } from "./client"
import Cookies from "js-cookie"

export const getDreamDiaries = () => {
  return client.get("dream_diaries", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
  })
}

export const getDreamDiary = (id: number) => {
  return client.get(`dream_diaries/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
  })
}