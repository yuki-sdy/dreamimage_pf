import React, { useCallback, useContext, useEffect, useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

import { AuthContext } from "../../../App"
import Cookies from "js-cookie"
import { useLocation, useNavigate } from "react-router-dom"
import { deleteAccount, updateUser } from "../../../lib/api/users"
import { Button, Avatar, Grid, IconButton, TextField, Typography, Divider, DialogContent, Dialog, Box, DialogActions, DialogTitle } from "@material-ui/core"
import AlertMessage from "../../utils/AlertMessage"
import { UpdateUserFormData } from "../../../interfaces"
import { signOut } from "../../../lib/api/auth"
import { PhotoCamera } from "@material-ui/icons"

import EditIcon from "@material-ui/icons/Edit"
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CancelIcon from "@material-ui/icons/Cancel"
import { Link } from "react-router-dom"


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

  const [successOpen, setSuccessOpen] = useState<boolean>(false)
  const [successMsg, setSuccessMsg] = useState<string>("")
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertMsg, setAlertMsg] = useState<string>("")


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
      
      if (res.status === 200) {
        setEditFormOpen(false)
        setCurrentUser(res.data.user)

        setSuccessMsg("プロフィールを更新しました。")
        setSuccessOpen(true)
      } else {
        setAlertMsg("内容を確かめてください。")
        setAlertOpen(true)
      }
    } catch (err) {
      setAlertMsg("しばらく経ってからもう一度お試しください。")
      setAlertOpen(true)
    }
  }

  // サインアウト用の処理
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.status === 200) {
        // Cookieから各情報を削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        setCurrentUser(undefined)
        navigation("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return(
      <>
      {
        isSignedIn && currentUser ? (
          currentUser?.isGuest ? (
            <>
            <Card className={classes.card}>
              <CardContent>
                <Grid container justify="center">
                  <Grid item>
                    <Avatar
                      alt="avatar"
                      className={classes.avatar}
                    />
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item style={{ marginTop: "1.5rem"}}>
                    <Typography variant="body1" component="p" gutterBottom>
                      ゲストとしてログイン中です
                    </Typography>
                    <Divider style={{ marginTop: "0.5rem"}}/>
                      <Button
                      variant="outlined"
                      component={Link}
                      to={'/signup'}
                      color="secondary"
                      fullWidth
                      style={{ marginTop: "1rem"}}
                    >
                      新規登録
                    </Button>
                      <Button
                      variant="outlined"
                      component={Link}
                      to={'/signin'}
                      color="primary"
                      fullWidth
                      style={{ marginTop: "1rem"}}
                    >
                      ログイン
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            </>
          ) : (
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
                        <Typography variant="body2" component="p" color="textSecondary" style={{whiteSpace: "pre-wrap"}}>
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
        ) : (
          <></>
        )
      }
    </>
  )
}

export default Profile