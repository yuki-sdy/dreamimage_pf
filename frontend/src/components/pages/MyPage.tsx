import React, { useContext, useEffect, useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { AuthContext } from "../../App"
import Cookies from "js-cookie"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { deleteAccount } from "../../lib/api/users"
import { Button, Grid } from "@material-ui/core"
import CardComp from "./dreamDiaries/organisms/CardComp"
import AlertMessage from "../utils/AlertMessage"
import { DreamDiary } from "../../interfaces"
import { getMypage } from "../../lib/api/mypages"

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


const MyPage: React.FC = () => {
  const { isSignedIn, currentUser, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiaries, setDreamDiaries] = useState<DreamDiary[]>([])

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(location.state)

  const handleDreamDiaries = async () => {
    try {
      const res = await getMypage()
      console.log(res.data)

      if (res.status === 200) {
        setDreamDiaries(res.data.dreamDiaries)
        console.log(dreamDiaries)
      } else {
        console.log("No diary")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleDreamDiaries()
  }, [])

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

  return(
    <>
         {
        !loading ? (
          dreamDiaries.length > 0 ? (
            <>
            <h3 style={{textAlign:"center"}}>{currentUser?.name}の夢絵日記一覧</h3>
            <Grid container justify="flex-start" style={{width: "100%"}}>
            {
            dreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
              return (
                <Grid item container key={index} xs={12} md={4} lg={3} sm={6} spacing={1} justify="center">
                  <CardComp
                    id={dreamDiary.id}
                    image={dreamDiary.image}
                    title={dreamDiary.title}
                    content={dreamDiary.content}
                    dreamDate={dreamDiary.dreamDate}
                    impression={dreamDiary.impression}
                    dreamType={dreamDiary.dreamType}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          </>
          ) : (<></>)
          )
        : (<></>) 
      }
      <AlertMessage // 削除後のフラッシュ
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="日記を削除しました。"
      />
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

export default MyPage