import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"


import { AuthContext } from "../../App"
import AlertMessage from "../utils/AlertMessage"
import { signUp } from "../../lib/api/auth"
import { SignUpData } from "../../interfaces"


const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  }
}))

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const navigation = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  
  type Provider = 'twitter'
  const [authProvider, setAuthProvider] = useState<Provider | null>(null)
  const [openAuthWindow, setOpenAuthWindow] = useState<Window | null>(null)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignUpData = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    const openAuth = (provider: Provider): Window | null => {
      const authURL = (provider :Provider) => `localhost/app/v1/${provider}`

      // open with post method to protect from csrf
      let blankForm = document.createElement('form')
      blankForm.target = provider
      blankForm.method = 'post'
      blankForm.action = `${authURL(provider)}?omniauth_window_type=newWindow`
    
      // connect form
      blankForm.style.display = 'none'
      document.body.appendChild(blankForm)
    
      let authWindow = window.open('', provider)
      console.log(blankForm.submit())
    
      // cut form
      document.body.removeChild(blankForm)
    
      return authWindow
    }

    // useEffect(() => {
    //   if (!openAuthWindow) return
    //   window.addEventListener('message', (e) => {
    //     const data = camelcaseKeys(e.data) as { [key: string]: any }
    //     const authParamKeys = ['authToken', 'clientId', 'uid']
    //     if (
    //       !authParamKeys.reduce(
    //         (acc: boolean, cur: string): boolean =>
    //           acc && Object.keys(data).includes(cur),
    //         true
    //       )
    //     ) {
    //       return
    //     }
  
    //     Cookies.set("_access_token", data.authToken) 
    //     Cookies.set("_client", data.clientId) 
    //     Cookies.set("_uid", data.uid) 
        
    //     setCurrentUser(data as User)
  
    //     clearInterval(timer)
    //     setAuthProvider(null)
    //     setOpenAuthWindow(null)
    //   })
  
    //   const timer = setInterval(() => {
    //     openAuthWindow.postMessage('requestCredentials', domainURL)
    //   }, 200)
    // }, [openAuthWindow])

    try {
      const res = await signUp(data)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にサインインさせてしまう
        Cookies.set("_access_token", res.headers["access-token"] || "") 
        Cookies.set("_client", res.headers["client"] || "") 
        Cookies.set("_uid", res.headers["uid"] || "") 

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigation("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="サインアップ" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="名前"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード（確認用）"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <div className={classes.submitBtn}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                onClick={() =>(openAuth('twitter'))}>
                twitter
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      />
    </>
  )
}

export default SignUp