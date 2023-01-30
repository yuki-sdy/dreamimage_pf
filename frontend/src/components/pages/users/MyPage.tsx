import React, { useContext, useEffect, useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { AuthContext } from "../../../App"
import { Link, useLocation } from "react-router-dom"
import { Button, Grid, Tabs, Tab, Typography, Box, Avatar, Divider } from "@material-ui/core"
import CreateIcon from "@material-ui/icons/Create"
import CircularProgress from '@material-ui/core/CircularProgress'
import CardComp from "../dreamDiaries/organisms/CardComp"
import AlertMessage from "../../utils/AlertMessage"
import { DreamDiary, Bookmark } from "../../../interfaces"
import { getMypage } from "../../../lib/api/mypages"
import { Alert } from "@material-ui/lab"
import Pagenation from "../dreamDiaries/organisms/Pagenation"
import { useMediaQueryContext } from "../../provider/MediaQueryPrivider"
import { Diversity1Rounded, Diversity1Sharp } from "@mui/icons-material"

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    textAlign: "center",
    paddingTop: "20px"
  },
  nameTypography: {
    fontWeight: "bold",
    fontSize: "18px"
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
  mAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  grid: {
    marginTop: "1rem",
    marginLeft: "1.5rem"
  },
  mGrid: {
    marginTop: "0.5rem",
    marginLeft: "0.5rem"
  },
  button: {
    fontSize: "12px",
    marginTop: "1rem"
  },
  mButton: {
    marginLeft: "auto",
    fontSize: "6px"
  },
}))


const MyPage: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const { isMobileSite, isPcSite } = useMediaQueryContext()
  const classes = useStyles()
  const location = useLocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiaries, setDreamDiaries] = useState<DreamDiary[]>([])
  const [myDiaries, setMyDiaries] = useState<DreamDiary[]>([])
  const [bookmarkDiaries, setBookmarkDiaries] = useState<Bookmark[]>([])

  const [successOpen, setSuccessOpen]
   = useState<boolean>(location.state ? (location.state.successOpen) : (false))
  const [successMsg, setSuccessMsg]
   = useState<string>(location.state ? (location.state.successMsg) : (""))
  const [alertOpen, setAlertOpen]
   = useState<boolean>(location.state ? (location.state.alertOpen) : (false))
  const [alertMsg, setAlertMsg]
   = useState<string>(location.state ? (location.state.alertMsg) : (""))

  const [offset, setOffset] = useState<number>(0)
  const perPage = 18
  const mPerPage = 10
  const currentDreamDiaries = isPcSite ? (dreamDiaries.slice(offset, offset + perPage)) : (dreamDiaries.slice(offset, offset + mPerPage))

  const handleDreamDiaries = async () => {
    try {
      const res = await getMypage()

      if (res.status === 200) {
        setMyDiaries(res.data.dreamDiaries)
        setDreamDiaries(res.data.dreamDiaries)
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
  }

  return(
    <>
    {
      isPcSite && (
        <>
          {
          !loading ? (
            <>
            <GuestAlert />
            <Box style={{margin: "auto", display: "flex"}}>
                    <div>
                      <Avatar
                        alt="avatar"
                        src={currentUser?.image.url}
                        className={classes.avatar}
                      />
                    </div>
                    <div className={classes.grid}>
                    <Typography variant="body1" component="p" gutterBottom className={classes.nameTypography}>
                        {currentUser?.name}
                    </Typography>
                      {
                      !currentUser?.isGuest ? (
                        currentUser?.introduction ? (
                          <Typography variant="body2" component="p" color="textSecondary" style={{whiteSpace: "pre-wrap"}}>
                            {currentUser?.introduction}
                          </Typography>
                        ): (
                          <Typography variant="body2" component="p" color="textSecondary">
                            よろしくお願いいたします。
                          </Typography>
                        )
                      ):(<></>)
                      }
                      <Button
                        component={Link}
                        to="/profile"
                        variant="contained"
                        className={classes.button}
                      >
                        プロフィール確認
                      </Button>
                    </div>
                  </Box>
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
                    <Tab value={2} label="お気に入りの日記"
                      disabled={currentUser?.isGuest ? true : false} />
                  </Tabs>
                </div>
              </div>
            {
            dreamDiaries.length > 0 ? (
            <>
              <Grid container style={{minWidth: "1200px"}}>
              {
              currentDreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
                return (
                  <Grid item container key={index} xs={2} style={{margin: "auto"}}justify="center">
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
                      commentCount={dreamDiary.commentCount}
                      />
                  </Grid>
                )
              })
            }
            </Grid>
            <Pagenation
              dreamDiaries={dreamDiaries}
              perPage={perPage}
              setOffset={setOffset}
            />
            </>
            ) : (
            <>
            <Box className={classes.box}>
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
          : (
          <Box className={classes.box}>
            <CircularProgress />
          </Box>
          )
        }
      </>
      )
    }
    {
      isMobileSite && (
        <>
          {
          !loading ? (
            <>
            <GuestAlert />
            <Grid container>
                    <Grid item xs={3}>
                      <Avatar
                        alt="avatar"
                        src={currentUser?.image.url}
                        className={classes.mAvatar}
                      />
                    </Grid>
                    <Grid item className={classes.mGrid} xs={8}>
                    <Typography variant="body1" component="p" gutterBottom className={classes.nameTypography}>
                        {currentUser?.name}
                    </Typography>
                      {
                      !currentUser?.isGuest ? (
                        currentUser?.introduction ? (
                          <Typography variant="body2" component="p" color="textSecondary" style={{whiteSpace: "pre-wrap", overflow: "hidden", textOverflow: "ellipsis",
                          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>
                            {currentUser?.introduction}
                          </Typography>
                        ): (
                          <Typography variant="body2" component="p" color="textSecondary">
                            よろしくお願いいたします。
                          </Typography>
                        )
                      ):(<></>)
                      }
                    </Grid>
                      <Button
                        component={Link}
                        to="/profile"
                        variant="contained"
                        className={classes.mButton}
                      >
                        プロフィール確認
                      </Button>
                  </Grid>
                    <Divider style={{ marginTop: "1rem"}}/>
              <div className={classes.root}>
                <div>
                  <Tabs
                  value={valueTabs}
                  onChange={handleChangeTabs}
                  aria-label="ant example"
                  variant="fullWidth"
                  >
                    <Tab value={1} label="自分の日記"  />
                    <Tab value={2} label="お気に入りの日記"
                      disabled={currentUser?.isGuest ? true : false} />
                  </Tabs>
                </div>
              </div>
            {
            dreamDiaries.length > 0 ? (
            <>
              <Grid container style={{minWidth: "50%"}}>
              {
              currentDreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
                return (
                  <Grid item container key={index} xs={6}>
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
                      commentCount={dreamDiary.commentCount}
                      />
                  </Grid>
                )
              })
            }
            </Grid>
            <Pagenation
              dreamDiaries={dreamDiaries}
              perPage={mPerPage}
              setOffset={setOffset}
            />
            </>
            ) : (
            <>
            <Box className={classes.box}>
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
          : (
          <Box className={classes.box}>
            <CircularProgress />
          </Box>
          )
        }
      </>
      )
    }
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

export default MyPage