import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import { signOut } from "../../lib/api/auth"
import { AuthContext } from "../../App"

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
  headerImage: {
    position: "relative",
    height: "60vh",
    backgroundImage: "url(/header.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  }
}))

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles();
  const navigation = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigation("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Button
              component={Link}
              to="/mypage"
              color="inherit"
              className={classes.linkBtn}
            >
              マイページ
            </Button>
            <Button
              color="inherit"
              className={classes.linkBtn}
              onClick={handleSignOut}
            >
              ログアウト
            </Button>
          </>
        )
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/"
              color="inherit"
              className={classes.linkBtn}
            >
              作ってみる
            </Button>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              className={classes.linkBtn}
            >
              ログイン
            </Button>
            <Button
            component={Link}
            to="/signup"
            color="secondary"
            variant="outlined"
            className={classes.linkBtn}
          >
            無料登録
          </Button>
        </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static" style={{ color: "black", backgroundColor: "#fcfbfd" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            夢絵日記
          </Typography>
          <Button
              component={Link}
              to="/dreamdiaries"
              color="inherit"
              className={classes.linkBtn}
            >
              夢絵日記一覧
            </Button>
          <AuthButtons />
        </Toolbar>
      <div className={classes.headerImage}/>
      </AppBar>
    </>
  )
}

export default Header