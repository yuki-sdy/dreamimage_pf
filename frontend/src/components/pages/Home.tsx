import React, { useContext, useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "../../App"
import Cookies from "js-cookie"

import { Link, useLocation, useNavigate } from "react-router-dom"

import Box from "@material-ui/core/Box"
import { Button } from "@material-ui/core"

import GoButtonImage from '../../images/gobutton.png'
import TopImage from '../../images/topimage.png'
import TopButton1 from '../../images/topbutton1.png'
import KiraKira from '../../images/kirakira.png'
import { SignUpData } from "../../interfaces"
import { signUp } from "../../lib/api/auth"
import AlertMessage from "../utils/AlertMessage"
import { useMediaQueryContext } from "../provider/MediaQueryPrivider"

const useStyles = makeStyles((theme: Theme) => ({
  topImage: {
    width: "1200px",
    position: "absolute",
    left:"-600px",
    zIndex: 1
  },
  mTopImage: {
    width: "380px",
    position: "absolute",
    left:"-190px",
    top: "-30px",
    zIndex: 1
  },
  containerBox: {
    position: "relative",
    height: "1750px"
  },
  mContainerBox: {
    position: "relative",
    height: "510px",
    marginTop: 0
  },
  imageBox: {
    position: "absolute",
    zIndex: 2,
  }
}))

const Home: React.FC = () => {
  const { setCurrentUser, currentUser, setIsSignedIn } = useContext(AuthContext)
  const { isMobileSite, isPcSite } = useMediaQueryContext()
  const classes = useStyles()
  const navigation = useNavigate()
  const location = useLocation()

  const [successOpen, setSuccessOpen]
   = useState<boolean>(location.state ? (location.state.successOpen) : (false))
  const [successMsg, setSuccessMsg]
   = useState<string>(location.state ? (location.state.successMsg) : (""))
  const [alertOpen, setAlertOpen]
   = useState<boolean>(location.state ? (location.state.alertOpen) : (false))
  const [alertMsg, setAlertMsg]
   = useState<string>(location.state ? (location.state.alertMsg) : (""))

  // ゲストログイン
  const handleGuestLoginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (currentUser) {
      navigation("/dreamdiaries/new",
      {state: {successOpen: true, successMsg: "既にログインしています。"}})
    }else{
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
  
          navigation("/dreamdiaries/new",
          {state: {successOpen: true, successMsg: "ゲストでログインしました！"}})
        }
      } catch (err) {
        setAlertMsg("しばらく経ってからもう一度お試しください。")
        setAlertOpen(true)
      }
    }
  }

  return (
    <>
      {isPcSite && (
        <>
          <Box className={classes.containerBox}>
            <img src={TopImage} className={classes.topImage} />
            <Button 
              className={classes.imageBox} 
              style={{maxWidth: "1200px", top: "1370px", left: "-174px"}}
              onClick={handleGuestLoginSubmit}
              >
              <img src={TopButton1} style={{width: "350px"}} />
            </Button>
            <Box textAlign="center" className={classes.imageBox} style={{top: "1450px", left: "380px"}}>
                <Link to="/dreamdiaries">
                  <img src={GoButtonImage} style={{width: "250px"}} />
                </Link>
            </Box>
          </Box>
          <AlertMessage
            open={alertOpen}
            setOpen={setAlertOpen}
            severity="error"
            message={alertMsg}
          />
          <AlertMessage
            open={successOpen}
            setOpen={setSuccessOpen}
            severity="success"
            message={successMsg}
          />
        </>
        )
      }
      {isMobileSite && (
        <>
          <Box className={classes.mContainerBox}>
            <img src={TopImage} className={classes.mTopImage} />
            <Button 
              className={classes.imageBox} 
              style={{maxWidth: "50px", top: "395px", left: "-29px"}}
              onClick={handleGuestLoginSubmit}
              >
              <img src={TopButton1} style={{width: "135px"}} />
            </Button>
            <Box textAlign="center" className={classes.imageBox} style={{top: "430px", left: "112px"}}>
                <Link to="/dreamdiaries">
                  <img src={GoButtonImage} style={{width: "77px"}} />
                </Link>
            </Box>
          </Box>
          <AlertMessage
            open={alertOpen}
            setOpen={setAlertOpen}
            severity="error"
            message={alertMsg}
          />
          <AlertMessage
            open={successOpen}
            setOpen={setSuccessOpen}
            severity="success"
            message={successMsg}
          />
        </>
        )
      }
    </>
  )
}

export default Home