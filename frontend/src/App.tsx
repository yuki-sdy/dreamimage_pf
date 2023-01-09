import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import CommonLayout from "./components/layout/CommonLayout"
import DreamDiaries from "./components/pages/dreamDiaries/DreamDiaries"
import DreamDiaryBackForm from "./components/pages/dreamDiaries/DreamDiaryBackForm"
import DreamDiaryEditForm from "./components/pages/dreamDiaries/DreamDiaryEditForm"
import DreamDiaryForm from "./components/pages/dreamDiaries/DreamDiaryForm"
import DreamDiaryPreview from "./components/pages/dreamDiaries/DreamDiaryPreview"
import DreamDiaryShow from "./components/pages/dreamDiaries/DreamDiaryShow"

import Home from "./components/pages/Home"
import MyPage from "./components/pages/MyPage"
import Profile from "./components/pages/Profile"
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"

import { User } from "./interfaces"
import { getCurrentUser } from "./lib/api/auth"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  alertMessageOpen: boolean
  setAlertMessageOpen: React.Dispatch<React.SetStateAction<boolean>>
  alertMessage: string
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>("")

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      console.log(res)

      if (res?.status === 200) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.currentUser)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Navigate to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, alertMessage, setAlertMessage, alertMessageOpen, setAlertMessageOpen}}>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dreamdiaries" element={<DreamDiaries/>} />
            <Route path="/dreamdiaries/:id" element={<DreamDiaryShow />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            
            <Route path="/mypage" 
              element={<Private children={<MyPage />} />} />
            <Route path="/profile" 
              element={<Private children={<Profile />} />} />

            <Route path="/dreamdiaries/new" 
              element={<Private children={<DreamDiaryForm />} />} />
            <Route path="/dreamdiaries/preview"
              element={<Private children={<DreamDiaryPreview />} />} />
            <Route path="/dreamdiaries/back"
              element={<Private children={<DreamDiaryBackForm />} />} />
            <Route path="/dreamdiaries/:id/edit" 
              element={<Private children={<DreamDiaryEditForm />} />} />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App