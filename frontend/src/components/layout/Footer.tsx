import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Box, Button, Divider } from "@material-ui/core"
import Cookies from "js-cookie"
import { AuthContext } from "../../App"
import { deleteAccount } from "../../lib/api/users"
import CommonDialog from "../utils/CommonDialog"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  footer: {
    height: "200px",
    backgroundImage: "url(/footer.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  linkBtn: {
    textTransform: "none"
  },
  button: {
    "&:hover": {
      backgroundColor: "white",
      textDecoration: "underline"
    }
  }
}))

const Footer: React.FC = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
  const classes = useStyles();
  const navigation = useNavigate()
  const [dlgOpen, setDlgOpen] = useState<boolean>(false)

  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertMsg, setAlertMsg] = useState<string>("")

    //退会処理
    const handleDeleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
      setDlgOpen(false)
      const res = await deleteAccount(currentUser?.id)
  
      if (res.data.status === 200) {
        // アカウント削除時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
  
        setIsSignedIn(false)
        setCurrentUser(undefined)
        navigation("/",
        {state: {successOpen: true, successMsg: "アカウントを削除しました。"}})
      } else {
        setAlertMsg("アカウント削除ができませんでした。")
        setAlertOpen(true)
      }
      try {
      } catch (err) {
        setAlertMsg("しばらく経ってからもう一度お試しください。")
        setAlertOpen(true)
      }
    }

    const handleLinkOpen = () => {
      window.open("https://forms.gle/extMDdoxY9XgpRL9A", '_blank')
    }

  return (
    <>
    <div className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        <Box style={{display: "flex", alignItems: "center", backgroundColor: "white",width: "fit-content", borderRadius: "15px", padding: "8px 20px"}}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            className={classes.button}
            >
            遊び方
          </Button>
          <Divider orientation="vertical" flexItem/>
          <Button
            color="inherit"
            onClick={handleLinkOpen}
            className={classes.button}
            >
            お問合せ
          </Button>
          <Divider orientation="vertical" flexItem/>
          <Button
            component={Link}
            to="/term_of_service"
            color="inherit"
            className={classes.button}
            >
            利用規約
          </Button>
          <Divider orientation="vertical" flexItem/>
          <Button
            component={Link}
            to="/privacy_policy"
            color="inherit"
            className={classes.button}
            >
            個人情報保護方針
          </Button>
          {
            isSignedIn ? (
            <>
              <Divider orientation="vertical" flexItem/>
              <Button
                color="inherit"
                onClick={() => setDlgOpen(true)}
                className={classes.button}
                >
                アカウントの削除
              </Button>
            </>
            ) : (<></>)
          }
        </Box>
        <div style={{marginTop: ".5rem"}}>
          {'Copyright © '}
          {new Date().getFullYear()}
          {' 夢絵日記'}
        </div>
      </Typography>
    </div>
    <CommonDialog // 削除確認ダイアログ
      message={`「はい」を選ぶとこのアカウントの削除を実行します。\n実行後のユーザー情報復元はできませんので、ご注意ください。\n※実行後、投稿した日記やいいね等のデータは残ります。\n 削除をご希望される場合は、お問合せフォームよりご連絡ください。\n\n本当によろしいですか？`}
      open={dlgOpen}
      setOpen={setDlgOpen}
      doYes={handleDeleteAccount}
      />
    </>
  )
}
export default Footer