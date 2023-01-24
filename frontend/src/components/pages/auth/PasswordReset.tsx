import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

import AlertMessage from "../../utils/AlertMessage"
import { passwordReset } from "../../../lib/api/auth"
import { PasswordResetData } from "../../../interfaces"

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  box: {
    paddingTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

const PasswordReset: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()

  const [email, setEmail] = useState<string>("")

  const [successOpen, setSuccessOpen]
   = useState<boolean>(location.state ? (location.state.successOpen) : (false))
  const [successMsg, setSuccessMsg]
   = useState<string>(location.state ? (location.state.successMsg) : (""))
  const [alertOpen, setAlertOpen]
   = useState<boolean>(location.state ? (location.state.alertOpen) : (false))
  const [alertMsg, setAlertMsg]
   = useState<string>(location.state ? (location.state.alertMsg) : (""))

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: PasswordResetData = {
      email: email,
      // redirectUrl: 'http://localhost:3000/password/reset'
      redirectUrl: process.env.REACT_APP_FRONT + 'password/reset'
    }

    try {
      const res = await passwordReset(data)

      if (res.status === 200) {
        setEmail("")
        setSuccessMsg("送信されたメールをご確認ください。")
        setSuccessOpen(true)
      } else {
        setAlertMsg("無効なメールアドレスです。")
        setAlertOpen(true)
      }
    } catch (err) {
      setAlertMsg("無効なメールアドレスです。")
      setAlertOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="パスワードリセット" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <Box className={classes.submitBtn} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!email ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
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
          </CardContent>
        </Card>
      </form>
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

export default PasswordReset