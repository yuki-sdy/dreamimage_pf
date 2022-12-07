import { Button } from "@material-ui/core"
import React, { useContext } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "../../App"

import { deleteAccount } from "../../lib/api/users"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

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
  }
}))

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate();

  //退会処理
  const handleDeleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await deleteAccount(currentUser?.id)
    console.log(res)

    if (res.data.success === true) {
      // アカウント削除時には各Cookieを削除
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")

      setIsSignedIn(false)
      navigation("/signin")

      console.log("Succeeded in delete account")
    } else {
      console.log("Failed in delete account")
    }

    try {
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h2>メールアドレス: {currentUser?.email}</h2>
            <h2>名前: {currentUser?.name}</h2>
            <Button
            color="inherit"
            className={classes.linkBtn}
            onClick={handleDeleteAccount}
          >
            退会
          </Button>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default Home