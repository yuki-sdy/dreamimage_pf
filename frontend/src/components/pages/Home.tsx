import React, { useContext } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "../../App"
import Cookies from "js-cookie"

import { Link, useNavigate } from "react-router-dom"

import CreateIcon from "@material-ui/icons/Create"
import Box from "@material-ui/core/Box"
import { Button, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core"

import Image1 from "../../images/1.png"
import Image2 from "../../images/2.png"
import Image3 from "../../images/3.png"

import GoButtonImage from '../../images/gobutton.png'
import { SignUpData } from "../../interfaces"
import { signUp } from "../../lib/api/auth"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "center",    
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
  writeBtn: {
    textTransform: "none",
    backgroundColor: "#884898",
    color: "white",
    "&:hover" : {
      backgroundColor: "#b660cc"
    }
  },
  card: {
    minWidth: 340
  },
}))

const Home: React.FC = () => {
  const { setCurrentUser, currentUser, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate()

  // ゲストログイン
  const handleGuestLoginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (currentUser) {
      navigation("/dreamdiaries/new")
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
  
          navigation("/dreamdiaries/new")
  
          console.log("Signed in successfully!")
        } else {
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
    <Card className={classes.card}>
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="body1" component="p" style={{fontWeight: "bold", fontSize: "26px", paddingTop: "1.5rem"}}>
        夢絵日記を作ってみよう！
        </Typography>
        <Typography variant="body2" component="p">
              夢の内容を元に絵を生成できます！
              あなただけの夢絵日記を作ってみましょう！
              </Typography>
      </Grid>
    <Grid item xs={4}>
        <CardContent>
          <Grid container justify="center">
            <Grid item style={{marginLeft: "0.5rem"}}>
              <Typography variant="body1" component="p" gutterBottom>
              １. 夢を思い出しながら入力…
              </Typography>
            <Divider style={{ marginTop: "0.5rem"}}/>
              <Typography variant="body2" component="p" color="textSecondary">
              その夢絵日記にタイトルをつけるなら？<br />
              夢の内容は？あなたにとってどんな夢？<br />
              いつどんな風に見た夢？
              </Typography>
            </Grid>
              <Grid item style={{width: "350px", marginTop: "0.5rem"}}>
                <img src={ Image1 } style={{width: "100%"}}/>
              </Grid>
            </Grid>
        </CardContent>
      </Grid>
      <Grid item xs={4}>
        <CardContent>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="body1" component="p" gutterBottom>
              ２. キーワードで、いざ画像生成！
              </Typography>
            <Divider style={{ marginTop: "0.5rem"}}/>
              <Typography variant="body2" component="p" color="textSecondary">
              その夢に出てきたものや風景などを記入<br />
              して「絵を生成してみる」をクリック！<br />
              画像や夢についてコメントを追記してみよう！
              </Typography>
            </Grid>
            <Grid item style={{width: "350px", marginTop: "0.5rem"}}>
              <img src={ Image2 } style={{width: "100%"}}/>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
      <Grid item xs={4}>
        <CardContent>
          <Grid container justify="center">
            <Grid item style={{marginRight: "0.5rem"}}>
              <Typography variant="body1" component="p" gutterBottom>
              ３. 夢絵日記を作成して完了！
              </Typography>
            <Divider style={{ marginTop: "0.5rem"}}/>
              <Typography variant="body2" component="p" color="textSecondary">
              「内容を確認する」から作成できます！<br />
              公開にチェックをつけると<br />
              みんなの夢絵日記一覧に表示されるよ！
              </Typography>
            </Grid>
            <Grid item style={{width: "350px", marginTop: "0.5rem"}}>
              <img src={ Image3 } style={{width: "100%"}}/>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
      </Grid>
      <Box textAlign="center" className={classes.box}>
        <Button
        variant="contained"
        size="large"
        onClick={handleGuestLoginSubmit}
        startIcon={<CreateIcon />}
        className={classes.writeBtn}
        >
          ゲストユーザーとして<br/>
          今すぐ夢絵日記を作ってみる
        </Button>
      </Box>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <CardContent>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="body1" component="p" gutterBottom>
              注意事項
              </Typography>
            <Divider style={{ marginTop: "0.5rem"}}/>
              <Typography variant="body2" component="p" color="textSecondary">
              ・一日の画像生成回数の上限は、ゲストユーザー３回、ログインユーザー５回です。<br />
              　※夢絵日記の作成回数ではありません。<br />
              ・ゲストユーザーの状態で作成した夢絵日記のストック、編集や削除は当日限りです。<br />
              　継続して利用される場合には別途、新規登録をする必要があります。
              </Typography>
            </Grid>
          </Grid>
          </CardContent>
      </Grid>
      </Grid>
      </Card>
      <Box textAlign="center" className={classes.box}>
        <Typography variant="body1" style={{fontWeight: "bold"}}>
          まずは…<br />
          みんなの夢絵日記を見に行く？
        </Typography>
          <Link to="/dreamdiaries">
            <img src={GoButtonImage} style={{width: "300px"}} />
          </Link>
      </Box>
    </>
  )
}

export default Home