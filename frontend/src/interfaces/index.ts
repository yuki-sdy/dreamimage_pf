// サインアップ
export interface SignUpData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInData {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
}

//夢絵日記
export interface DreamDiary {
  id: number
  title: string
  body: string
  prompt: string
  dream_date: Date
  impression: number
  dream_type: number
  state: number
  ogp: string
  image: string
  userId: number | undefined

}