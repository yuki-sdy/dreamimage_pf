// サインアップ
export interface SignUpData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  isGuest?: boolean
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
  nickname: string
  image: {
    url: string
  }
  introduction: string
  isGuest?: boolean
  allowPasswordChange: boolean
}

export interface UpdateUserData {
  id: number | undefined | null
  name?: string 
  introduction?: string
  image?: string
}

export interface UpdateUserFormData extends FormData {
  append(name: keyof UpdateUserData, value: String | Blob, fileName?: string): any
}

//夢絵日記
export interface DreamDiary {
  id: number
  title: string
  body: string
  content: string
  prompt: string
  dreamDate: Date
  impression: number
  dreamType: number
  state: boolean
  diaryOgp: string
  image: string
  userId: number | undefined
  user: {
    id: number
    name: string
    image: {
      url: string
    }
  }
}

export interface DreamDiaryFormData extends FormData {
  append(name: keyof DreamDiary, value: String | Blob, fileName?: string): any
}

// いいね
export interface Like {
  id?: number
  userId: number | undefined
  dreamDiaryId: number | undefined
}