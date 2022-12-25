import React, { useContext } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "../../App"

import { Link, useNavigate } from "react-router-dom"

import DreamDiaryForm from "../pages/dreamDiaries/DreamDiaryForm"
import Box from "@material-ui/core/Box"
import { Typography } from "@material-ui/core"

import GoButtonImage from '../../images/gobutton.png'
import KirakiraImage from '../../images/kirakira.png'

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

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate()

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
      </Box>
    </>
  )
}

export default Home