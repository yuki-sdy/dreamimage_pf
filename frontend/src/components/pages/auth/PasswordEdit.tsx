import React, { useState, useContext } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import AlertMessage from "../../utils/AlertMessage"
import { PasswordUpdateData } from "../../../interfaces"
import { passwordUpdate } from "../../../lib/api/auth"


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

const PasswordEdit: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()
  const navigation = useNavigate()

  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  const [successOpen, setSuccessOpen] = useState<boolean>(false)
  const [successMsg, setSuccessMsg] = useState<string>("")
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertMsg, setAlertMsg] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: PasswordUpdateData = {
      password: password,
      passwordConfirmation: passwordConfirmation,
      resetPasswordToken: location.search.slice(7)
    }

    try {
      const query = new URLSearchParams(location.search)
      const res = await passwordUpdate(data, query)

      if (res.status === 200) {
        navigation("/signin", 
        {state: {successOpen: true, successMsg: "パスワードを変更しました！"}})
      } else {
        setAlertMsg("記入内容を確認してください。")
        setAlertOpen(true)
      }
    } catch (err) {
      setAlertMsg("記入内容を確認してください。")
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
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード（確認用）"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <Box className={classes.submitBtn} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!password || !passwordConfirmation ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
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

export default PasswordEdit