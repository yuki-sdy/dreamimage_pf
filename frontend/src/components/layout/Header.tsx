import React, { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../../App"
import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import CreateIcon from "@material-ui/icons/Create"
import AccountMenu from "./AccountMenu"
import TitleLogo from "../../images/titlelogo.png"

import { useMediaQueryContext } from "../provider/MediaQueryPrivider"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  linkBtn: {
    textTransform: "none",
    marginLeft: "15px"
  },
  mLinkBtn: {
    textTransform: "none",
    marginLeft: "3px",
    fontSize: "12px"
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
  },
  tHeaderImage: {
    position: "relative",
    height: "48vh",
    backgroundImage: "url(/header.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  },
  mHeaderImage: {
    position: "relative",
    height: "21vh",
    backgroundImage: "url(/header.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  }
}))

const Header: React.FC = () => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext)
  const { isMobileSite, isTabletSite, isPcSite } = useMediaQueryContext()
  const classes = useStyles();
  const location = useLocation()

  const HeaderImage = () => {
    if (location.pathname === "/privacy_policy") {
      return (<></>)
    }else if(location.pathname === "/term_of_service"){
      return (<></>)
    }else{
      return(
        <div className={classes.headerImage}/>
      )
    }
  }

  const MHeaderImage = () => {
    if (location.pathname === "/privacy_policy") {
      return (<></>)
    }else if(location.pathname === "/term_of_service"){
      return (<></>)
    }else{
      return(
        <div className={classes.mHeaderImage}/>
      )
    }
  }

  const THeaderImage = () => {
    if (location.pathname === "/privacy_policy") {
      return (<></>)
    }else if(location.pathname === "/term_of_service"){
      return (<></>)
    }else{
      return(
        <div className={classes.tHeaderImage}/>
      )
    }
  }

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

  const MAuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        if (currentUser?.isGuest) {
        return (
          <>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.mLinkBtn}
              >
              新規登録
            </Button>
            <AccountMenu/>
          </>
        )
      } else {
          return (
          <>
            <AccountMenu/>
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
              className={classes.mLinkBtn}
            >
              ログイン
            </Button>
            <Button
            component={Link}
            to="/signup"
            color="secondary"
            className={classes.mLinkBtn}
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
    { isPcSite && (
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
          <HeaderImage />
        </AppBar>
      </>
    )
    }
    { isTabletSite && (
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
          <THeaderImage />
        </AppBar>
      </>
    )
    }
    { isMobileSite && (
      <>
        <AppBar position="static" style={{ color: "black", backgroundColor: "#fcfbfd" }}>
          <Toolbar style={{display: "flex", justifyContent: "space-between", minHeight: "30px"}}>
          <Button
                component={Link}
                to="/"
              >
                <img src={TitleLogo} width="80px"/>
            </Button>
            <div style={{display: "flex"}}>
              <MAuthButtons />
            </div>
          </Toolbar>
          <MHeaderImage />
        </AppBar>
      </>
    )
    }
    </>
  )
}

export default Header