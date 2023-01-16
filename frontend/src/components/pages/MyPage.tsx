import React, { useContext, useEffect, useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { AuthContext } from "../../App"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Grid, Tabs, Tab, Typography, Box, Avatar, Divider } from "@material-ui/core"
import CardComp from "./dreamDiaries/organisms/CardComp"
import AlertMessage from "../utils/AlertMessage"
import { DreamDiary, Bookmark } from "../../interfaces"
import { getMypage } from "../../lib/api/mypages"
import CreateIcon from "@material-ui/icons/Create"
import { Alert } from "@material-ui/lab"

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
  writeBtn: {
    textTransform: "none",
    backgroundColor: "#884898",
    color: "white",
    margin: "auto",
    "&:hover" : {
      backgroundColor: "#b660cc"
    }
  },
  root: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
}))


const MyPage: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiaries, setDreamDiaries] = useState<DreamDiary[]>([])
  const [myDiaries, setMyDiaries] = useState<DreamDiary[]>([])
  const [bookmarkDiaries, setBookmarkDiaries] = useState<Bookmark[]>([])

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(location.state)

  const handleDreamDiaries = async () => {
    try {
      const res = await getMypage()
      console.log(res.data)

      if (res.status === 200) {
        setMyDiaries(res.data.dreamDiaries)
        setBookmarkDiaries(res.data.bookmarks)

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

  const GuestAlert = () => {
    if (!loading) {
      if (currentUser?.isGuest) {
        return (
          <Alert severity="warning" color="warning">
            このアカウントを引き続き利用する場合は、本日中にヘッダーから新規登録を行ってください！
          </Alert>
        )
      } else {
        return <></>
      }
    } else {
      return <></>
    }
  }

  const [valueTabs, setValueTabs] = useState<number>(1)

  const handleChangeTabs = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValueTabs(newValue)
    if(newValue === 1) {
      setDreamDiaries(myDiaries)
    }else if(newValue === 2) {
      const diaries :DreamDiary[] = bookmarkDiaries.map(x => x.dreamDiary)
      setDreamDiaries(diaries)
    }
    console.log(myDiaries)
    console.log(bookmarkDiaries)
  }

  return(
    <>
         {
        !loading ? (
          <>
          <Grid container>
                  <Grid item>
                    <Avatar
                      alt="avatar"
                      src={currentUser?.image.url}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "1rem", marginLeft: "1.5rem"}}>
                  <Typography variant="body1" component="p" gutterBottom style={{fontWeight: "bold", fontSize: "18px"}}>
                      {currentUser?.name}
                  </Typography>
                    {
                      currentUser?.introduction ? (
                        <Typography variant="body2" component="p" color="textSecondary">
                          {currentUser?.introduction}
                        </Typography>
                      ): (
                        <Typography variant="body2" component="p" color="textSecondary">
                          よろしくお願いいたします。
                        </Typography>
                      )
                    }
                  </Grid>
                  <Grid item style={{ marginTop: "1rem", marginLeft: "1.5rem"}}></Grid>
                    <Button
                      component={Link}
                      to="/profile"
                      variant="contained"
                    >
                      プロフィール確認
                    </Button>
                </Grid>
                  <Divider style={{ marginTop: "2rem"}}/>
            <div className={classes.root}>
              <div>
                <Tabs
                value={valueTabs}
                onChange={handleChangeTabs}
                aria-label="ant example"
                variant="fullWidth"
                >
                  <Tab value={1} label="自分の日記"  />
                  <Tab value={2} label="お気に入りの日記" />
                </Tabs>
              </div>
            </div>
          {
          dreamDiaries.length > 0 ? (
          <>
          <GuestAlert />
            <Grid container style={{width: "100%"}}>
            {
            dreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
              return (
                <Grid item container key={index} xs={12} md={4} lg={3} sm={6} style={{margin: "auto"}}justify="center">
                  <CardComp
                    id={dreamDiary.id}
                    image={dreamDiary.image}
                    title={dreamDiary.title}
                    content={dreamDiary.content}
                    dreamDate={dreamDiary.dreamDate}
                    impression={dreamDiary.impression}
                    dreamType={dreamDiary.dreamType}
                    userName={dreamDiary.user === null ? '退会済みユーザー' : dreamDiary.user.name}
                    userImage={dreamDiary.user === null ? '' : dreamDiary.user.image.url}
                    likeCount={dreamDiary.likeCount}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          </>
          ) : (
          <>
          <Box style={{textAlign: "center", paddingTop: "20px"}}>
          <h3>日記がありません！</h3>
            <Button
              component={Link}
              to="/dreamdiaries/new"
              variant="contained"
              startIcon={<CreateIcon />}
              className={classes.writeBtn}
            >
              日記を作成する
            </Button>
          </Box>
          </>)
          }
          </>
          )
        : (<></>)
      }
      <AlertMessage // 削除後のフラッシュ
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="日記を削除しました。"
      />
    </>
  )
}

export default MyPage