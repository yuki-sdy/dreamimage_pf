import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../App"
import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import CreateIcon from "@material-ui/icons/Create"
import AccountMenu from "./AccountMenu"
import TitleLogo from "../../images/titlelogo.png"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
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
        <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
          <Button
              component={Link}
              to="/"
            >
              <img src={TitleLogo} width="150px"/>
          </Button>
          <div style={{display: "flex"}}>
            <Button
                component={Link}
                to="/dreamdiaries"
                color="inherit"
                className={classes.linkBtn}
              >
                夢絵日記一覧
              </Button>
            <AuthButtons />
          </div>
        </Toolbar>
      <div className={classes.headerImage}/>
      </AppBar>
    </>
  )
}

export default Header