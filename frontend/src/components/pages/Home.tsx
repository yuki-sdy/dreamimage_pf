import React, { useContext } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "../../App"
import Cookies from "js-cookie"

import { Link, useNavigate } from "react-router-dom"

import DreamDiaryForm from "../pages/dreamDiaries/DreamDiaryForm"
import Box from "@material-ui/core/Box"
import { Button, Typography } from "@material-ui/core"

import GoButtonImage from '../../images/gobutton.png'
import { SignUpData } from "../../interfaces"
import { signUp } from "../../lib/api/auth"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none"
  },
  box: {
    paddingTop: "2rem"
  },
  link: {
    textDecoration: "none"
  },
}))

const Home: React.FC = () => {
  const { isSignedIn, setCurrentUser, currentUser, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate()

  // ゲストログイン
  const handleGuestLoginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!currentUser?.isGuest) {
      navigation("/dreamdiaries/new")
    }

    const getUniqueStr = (myStrong?: number) : string => {
      let strong = 1000
      if(myStrong) strong = myStrong
      return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
      )
    }

    const data: SignUpData = {
      name: 'ゲスト',
      email: `${getUniqueStr()}@example.com`,
      password: 'guest_password',
      passwordConfirmation: 'guest_password',
      isGuest: true
    }

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

        navigation("/dreamdiaries/new")

        console.log("Signed in successfully!")
      } else {
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <DreamDiaryForm />
      <Box textAlign="center" className={classes.box}>
        <Typography variant="body2">
          みんなの夢絵日記を見に行こう！
        </Typography>
          <Link to="/dreamdiaries">
            <img src={GoButtonImage} />
          </Link>
      </Box>
      <Box textAlign="center" className={classes.box}>
        <Typography variant="body2">
          まだアカウントをお持ちでない方は
          <Link to="/signup" className={classes.link}>
            こちら
          </Link>
            から作成してください。
        </Typography>
        <Button  onClick={handleGuestLoginSubmit}>
          ゲストとして日記を作ってみる
        </Button>
      </Box>
    </>
  )
}

export default Home