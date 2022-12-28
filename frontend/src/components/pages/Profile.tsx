import React, { useCallback, useContext, useEffect, useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

import { AuthContext } from "../../App"
import Cookies from "js-cookie"
import { useLocation, useNavigate } from "react-router-dom"
import { deleteAccount, updateUser } from "../../lib/api/users"
import { Button, Avatar, Grid, IconButton, TextField, Typography, Divider, DialogContent, Dialog, Box, DialogActions, DialogTitle } from "@material-ui/core"
import AlertMessage from "../utils/AlertMessage"
import { UpdateUserFormData } from "../../interfaces"
import { signOut } from "../../lib/api/auth"
import { PhotoCamera } from "@material-ui/icons"

import EditIcon from "@material-ui/icons/Edit"
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CancelIcon from "@material-ui/icons/Cancel"


const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  card: {
    width: 340
  },
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  box: {
    marginBottom: "1.5rem"
  },
  preview: {
    width: "100%"
  },
  linkBtn : {
    textTransform: "none"
  }
}))


const Profile: React.FC = () => {
  const { isSignedIn, currentUser, setCurrentUser, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate()
  const location = useLocation()

  const [editFormOpen, setEditFormOpen] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>(currentUser?.name)
  const [introduction, setIntroduction] = useState<string | undefined>(currentUser?.introduction)
  const [image, setImage] = useState<string>("")
  const [preview, setPreview] = useState<string>("")

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(location.state)

    // アップロードした画像の情報を取得
    const uploadImage = useCallback((e :any) => {
      const file = e.target.files[0]
      setImage(file)
    }, [])
  
    // 画像プレビュー
    const previewImage = useCallback((e :any) => {
      const file = e.target.files[0]
      setPreview(window.URL.createObjectURL(file))
    }, [])

  const createFormData = (): UpdateUserFormData => {
    const formData = new FormData()

    formData.append("name", name || "")
    formData.append("introduction", introduction || "")
    formData.append("image", image)

    return formData
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await updateUser(currentUser?.id, data)
      console.log(res)

      if (res.status === 200) {
        setEditFormOpen(false)
        setCurrentUser(res.data.user)

        console.log("Update user successfully!")
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
      console.log("Failed in updating user!")
    }
  }

  // サインアウト用の処理
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // Cookieから各情報を削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigation("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }



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
        isSignedIn && currentUser ? (
          <>
            <Card className={classes.card}>
              <CardContent>
                <Grid container justify="flex-end">
                  <Grid item>
                    <IconButton
                      onClick={() => setEditFormOpen(true)}
                    >
                      <EditIcon
                        color="action"
                        fontSize="small"
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item>
                    <Avatar
                      alt="avatar"
                      src={currentUser?.image.url}
                      className={classes.avatar}
                    />
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item style={{ marginTop: "1.5rem"}}>
                    <Typography variant="body1" component="p" gutterBottom>
                      {currentUser?.name}
                    </Typography>
                    <Divider style={{ marginTop: "0.5rem"}}/>
                    <Typography
                      variant="body2"
                      component="p"
                      gutterBottom
                      style={{ marginTop: "0.5rem", fontWeight: "bold" }}
                    >
                      自己紹介
                    </Typography>
                    {
                      currentUser.introduction ? (
                        <Typography variant="body2" component="p" color="textSecondary">
                          {currentUser.introduction}
                        </Typography>
                      ): (
                        <Typography variant="body2" component="p" color="textSecondary">
                          よろしくお願いいたします。
                        </Typography>
                      )
                    }
                    <Button
                      variant="outlined"
                      onClick={handleSignOut}
                      color="primary"
                      fullWidth
                      startIcon={<ExitToAppIcon />}
                      style={{ marginTop: "1rem"}}
                    >
                      ログアウト
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <form noValidate autoComplete="off">
              <Dialog
                open={editFormOpen}
                keepMounted
                onClose={() => setEditFormOpen(false)}
              >
                <DialogTitle style={{ textAlign: "center"}}>
                  プロフィールの変更
                </DialogTitle>
                <DialogContent>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="名前"
                    value={name}
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                  <TextField
                    placeholder="1000文字以内で書いてください。"
                    variant="outlined"
                    multiline
                    fullWidth
                    label="自己紹介"
                    rows="8"
                    value={introduction}
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setIntroduction(e.target.value)
                    }}
                  />
                  <div className={classes.imageUploadBtn}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        uploadImage(e)
                        previewImage(e)
                      }}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </div>
                  {
                    preview ? (
                      <Box
                        className={classes.box}
                      >
                        <IconButton
                          color="inherit"
                          onClick={() => setPreview("")}
                        >
                          <CancelIcon />
                        </IconButton>
                        <img
                          src={preview}
                          alt="preview img"
                          className={classes.preview}
                        />
                      </Box>
                    ) : null
                  }
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    disabled={!name || !introduction ? true : false}
                  >
                    送信
                  </Button>
                </DialogActions>
              </Dialog>
          <Button
              color="inherit"
              className={classes.linkBtn}
              onClick={handleDeleteAccount}
            >
              退会
            </Button>
            </form>
            <AlertMessage // 削除後のフラッシュ
              open={alertMessageOpen}
              setOpen={setAlertMessageOpen}
              severity="success"
              message="日記を削除しました。"
            />
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default Profile