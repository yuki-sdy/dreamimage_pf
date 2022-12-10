import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import CommonLayout from "./components/layout/CommonLayout"
import DreamDiaries from "./components/pages/dreamDiaries/DreamDiaries"
import DreamDiaryEditForm from "./components/pages/dreamDiaries/DreamDiaryEditForm"
import DreamDiaryForm from "./components/pages/dreamDiaries/DreamDiaryForm"
import DreamDiaryShow from "./components/pages/dreamDiaries/DreamDiaryShow"

import Home from "./components/pages/Home"
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
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

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
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Private children={<Home />} />} />
            <Route path="/dreamdiaries" element={<Private children={<DreamDiaries />} />} />
            <Route path="/dreamdiaries/:id" 
              element={<Private children={<DreamDiaryShow />} />} />
            <Route path="/dreamdiaries/new" 
              element={<Private children={<DreamDiaryForm />} />} />
            <Route path="/dreamdiaries/:id/edit" 
              element={<Private children={<DreamDiaryEditForm />} />} />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App