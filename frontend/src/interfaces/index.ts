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

// パスワードリセット
export interface PasswordResetData {
  email: string
  redirectUrl: string
}

// パスワード変更
export interface PasswordUpdateData {
  password: string
  passwordConfirmation: string
  resetPasswordToken: string
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
    id: number | undefined
    name: string
    image: {
      url: string
    }
  }
  likes: {
    id: number | undefined
    userId: number | undefined
    dreamDiaryId: number | undefined
  }
  likeCount: number
  commentCount: number
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

// お気に入り
export interface BookmarkData {
  id?: number
  userId: number | undefined
  dreamDiaryId: number | undefined
}

export interface Bookmark {
  id?: number | undefined
  userId: number | undefined
  dreamDiaryId: number | undefined
  dreamDiary: {
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
      id: number | undefined
      name: string
      image: {
        url: string
      }
    }
    likes: {
      id: number | undefined
      userId: number | undefined
      dreamDiaryId: number | undefined
    }
    likeCount: number
    commentCount: number
  }
}

// コメント
export interface CommentData {
  id?: number
  userId: number | undefined
  dreamDiaryId: number | undefined
  body: string
}

export interface Comment {
  id?: number
  userId: number
  dreamDiaryId: number
  body: string
  createdAt: Date
  user: {
    id: number
    name: string
    image: {
      url: string
    }
  }
}