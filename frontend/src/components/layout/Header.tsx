import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../App"
import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CreateIcon from "@material-ui/icons/Create"
import AccountMenu from "./AccountMenu"

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
    textTransform: "none",
    marginLeft: "15px"
  },
  writeBtn: {
    textTransform: "none",
    backgroundColor: "#884898",
    color: "white",
    "&:hover" : {
      backgroundColor: "#b660cc"
    }
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
  const { loading, isSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles();

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        if (currentUser?.isGuest) {
        return (
          <>
            <AccountMenu/>
            <Button
              component={Link}
              to="/dreamdiaries/new"
              variant="contained"
              startIcon={<CreateIcon />}
              className={classes.writeBtn}
            >
              日記投稿
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="secondary"
              variant="outlined"
              className={classes.linkBtn}
            >
              新規登録
            </Button>
          </>
        )
      } else {
          return (
          <>
            <AccountMenu/>
            <Button
              component={Link}
              to="/dreamdiaries/new"
              variant="contained"
              startIcon={<CreateIcon />}
              className={classes.writeBtn}
            >
              日記投稿
            </Button>
          </>
          )
        }
      } else {
        return (
          <>
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
            新規登録
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