import { Avatar, Box, Button, Divider, Grid, IconButton, makeStyles, TextField, Theme, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import { DreamDiary, Like, BookmarkData, Comment, CommentData } from "../../../interfaces"
import { DreamDiaryDestroy, getDreamDiary, TwitterShare } from "../../../lib/api/dreamdiaries"
import AlertMessage from "../../utils/AlertMessage"
import CommonDialog from "../../utils/CommonDialog"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import Delete from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import TwitterIcon from '@mui/icons-material/Twitter'
import { AuthContext } from "../../../App"
import { createLike, destroyLike } from "../../../lib/api/likes"
import { createBookmark, destroyBookmark } from "../../../lib/api/bookmarks"
import { createComment, destroyComment } from "../../../lib/api/comments"
import CommentArea from "./organisms/CommentArea"
import { useMediaQueryContext } from "../../provider/MediaQueryPrivider"

const useStyles = makeStyles((theme: Theme) => ({
  linkBtn: {
    textTransform: "none"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  preview: {
    width: "65%"
  },
  mPreview: {
    width: "95%"
  },
  tPreview: {
    width: "70%"
  },
  submitBtn: {
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: "1rem"
  },
  mAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: "0.5rem"
  },
}))

const DreamDiaryShow: React.FC = () => {
  const { currentUser, isSignedIn } = useContext(AuthContext)
  const { isMobileSite, isTabletSite, isPcSite } = useMediaQueryContext()
  const params = useParams()
  const classes = useStyles()
  const navigation = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiary, setDreamDiary] = useState<DreamDiary>()
  const [currentUserLiked, setCurrentUserLiked] = useState<boolean>(false)
  const [likes, setLikes] = useState<Like[]>([])
  const [likesCount, setLikesCount] = useState<number>(0)
  const [like, setLike] = useState<Like>()
  const [bookmarks, setBookmarks] = useState<DreamDiary[]>([])
  const [bookmark, setBookmark] = useState<DreamDiary>()
  const [currentUserBookmarked, setCurrentUserBookmarked] = useState<boolean>(false)
  const [commentBody, setCommentBody] = useState<string>("")
  const [comments, setComments] = useState<Comment[]>([])
  const [fromPage, setFromPage] = useState<number>(location.state.fromPage)
  console.log(location.state.fromPage)

  const [DlgOpen, setDlgOpen] = useState<boolean>(false)
  const [twitterDlgOpen, setTwitterDlgOpen] = useState<boolean>(false)
  const [successOpen, setSuccessOpen]
   = useState<boolean>(location.state ? (location.state.successOpen) : (false))
  const [successMsg, setSuccessMsg]
   = useState<string>(location.state ? (location.state.successMsg) : (""))
  const [alertOpen, setAlertOpen]
   = useState<boolean>(location.state ? (location.state.alertOpen) : (false))
  const [alertMsg, setAlertMsg]
   = useState<string>(location.state ? (location.state.alertMsg) : (""))

  const handleDreamDiary = async () => {
    try {
      const res = await getDreamDiary(Number(params.id))
      console.log(res)
      
      if (res.status === 200) {
        setDreamDiary(res.data)
        setLikesCount(res.data.likes.length)
        setLikes(res.data.likes)
        setBookmarks(res.data.bookmarks)
        setComments(res.data.comments.reverse())

        // いいねされているどうか判定
        const likes = res.data.likes
        if (likes?.find((e: any)=> e.userId === currentUser?.id)) {
          setCurrentUserLiked(true)
        }
        // お気に入りされているかどうか判定
        const bookmarks = res.data.bookmarks
        if (bookmarks?.find((e: any)=> e.userId === currentUser?.id)) {
          setCurrentUserBookmarked(true)
        }
      } else {
        console.log("No diary")
      }
    } catch (err) {
      navigation("/notfound")
    }
    setLoading(false)
  }

  useEffect(() => {
    handleDreamDiary()
  }, [])
  
  // いいね作成
  const handleCreateLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data: Like = {
      userId: currentUser?.id,
      dreamDiaryId: dreamDiary?.id
    }

    try {
      const res = await createLike(data, dreamDiary?.id)
      console.log(res)

      if (res?.status === 200) {
        setLikes([res.data.like, ...likes])
        const count = likesCount + 1
        setLikesCount(count)
        setCurrentUserLiked(true)

      } else {
        setAlertMsg("いいねができませんでした。")
        setAlertOpen(true)
      }
    } catch (err) {
        setAlertMsg("しばらく経ってからもう一度お試しください。")
        setAlertOpen(true)
      }
    }
    
    // いいね削除
    const handleDestroyLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setLike(likes?.find(e => e.userId === currentUser?.id))
      try {
        const res = await destroyLike(dreamDiary?.id, like?.id)
        console.log(res)
        
        if (res?.status === 200) {
          setLikes(res.data.likes)
          
          const count = likesCount - 1
          setLikesCount(count)
          setCurrentUserLiked(false)
        } else {
          setAlertMsg("いいねが削除できませんでした。")
          setAlertOpen(true)
        }
    } catch (err) {
      setAlertMsg("しばらく経ってからもう一度お試しください。")
      setAlertOpen(true)
    }
  }

  // お気に入り作成
  const handleCreateBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data: BookmarkData = {
      userId: currentUser?.id,
      dreamDiaryId: dreamDiary?.id
    }

    try {
      const res = await createBookmark(data, dreamDiary?.id)
      console.log(res)

      if (res?.status === 200) {
        setLikes([res.data.bookmark, ...bookmarks])
        setCurrentUserBookmarked(true)
        setSuccessMsg("お気に入りに登録しました！")
        setSuccessOpen(true)
        
      } else {
        setAlertMsg("お気に入り登録ができませんでした。")
        setAlertOpen(true)
      }
    } catch (err) {
      setAlertMsg("しばらく経ってからもう一度お試しください。")
      setAlertOpen(true)
    }
  }
  
  // お気に入り削除
  const handleDestroyBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setBookmark(bookmarks?.find(e => e.userId === currentUser?.id))
    try {
      const res = await destroyBookmark(dreamDiary?.id, bookmark?.id)
      console.log(res)
      
      if (res?.status === 200) {
        setBookmark(void(null))
        setCurrentUserBookmarked(false)
        setSuccessMsg("お気に入りから削除しました。")
        setSuccessOpen(true)
        
      } else {
        setAlertMsg("お気に入りから削除できませんでした。")
        setAlertOpen(true)
      }
    } catch (err) {
      setAlertMsg("しばらく経ってからもう一度お試しください。")
      setAlertOpen(true)
    }
  }

  //夢絵日記削除処理
  const handleDeleteDreamDiary = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setDlgOpen(false)
    if (currentUser?.id !== dreamDiary?.userId) {
      setAlertMsg("権限がありません。")
      setAlertOpen(true)
    }else{
      const res = await DreamDiaryDestroy(dreamDiary?.id)
      
      if (res.data.status === 200) {
        navigation("/mypage",
        {state: {successOpen: true, successMsg: "日記を削除しました！"}})
      }  
      try {
      } catch (err) {
        setAlertMsg("日記の削除処理ができませんでした。")
        setAlertOpen(true)
      }
    }
  }

  // コメント作成
  const handleCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data: CommentData = {
      userId: currentUser?.id,
      dreamDiaryId: dreamDiary?.id,
      body: commentBody
    }
    try {
      const res = await createComment(data, dreamDiary?.id)
      console.log(res)

      if (res?.status === 200) {
        setComments([res.data, ...comments])
        setSuccessMsg("コメントを投稿しました。")
        setSuccessOpen(true)
        setCommentBody("")
        
      } else {
        setAlertMsg("コメントがで作成できませんでした。")
        setAlertOpen(true)
      }
    } catch (err) {
      setAlertMsg("しばらく経ってからもう一度お試しください。")
      setAlertOpen(true)
    }
  }

  // twitterシェア
  const handleTwitterSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTwitterDlgOpen(false)
    const url = `https://dreamdiary.magia.runteq.jp/api/v1/dream_diaries/${dreamDiary?.id}/images`
    try {
      const res = await TwitterShare(dreamDiary?.id, url)
      console.log(res)

      if (res?.status === 200) {
        const tweet = `https://twitter.com/intent/tweet?text=画像生成で夢を絵日記に！%20%23夢絵日記%20%0ahttps://www.dream-picturediary.com/dreamdiaries/${dreamDiary?.id}%0ahttps://twitter.com/DreamdiaryApp/status/${res.data.tweetId}`
        window.open(tweet, '_blank')
        
      } else {
        setAlertMsg("しばらく経ってからもう一度お試しください。")
        setAlertOpen(true)
      }
    } catch (err) {
      setAlertMsg("しばらく経ってからもう一度お試しください。")
      setAlertOpen(true)
    }
  }

  return (
    <>
    {
      isPcSite && (
        <>
     {
        !loading ? (
          <>
          <div style={{textAlign: "center"}}>
              <img
              src={dreamDiary?.diaryOgp}
              alt="diaryOgp img"
              className={classes.preview}
            />
          </div>
          <div  className={classes.submitBtn}>
          <Button
            onClick={
              currentUserLiked ? handleDestroyLike : handleCreateLike}
              color="secondary"
              startIcon={
                currentUserLiked ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)}
                disabled={!isSignedIn ? true : false}
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                >
            {`${likesCount}`}
          </Button>
          {
            isSignedIn ? (
            <>
          <Button
            onClick={
              currentUserBookmarked ? handleDestroyBookmark : handleCreateBookmark}
            color="secondary"
            startIcon={
              currentUserBookmarked ? (<BookmarkIcon />) : (<BookmarkBorderIcon />)}
            disabled={currentUser?.isGuest ? true : false}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            {currentUserBookmarked ? "お気に入り解除" : "お気に入り登録"}
          </Button>
          </>
          ):(<></>)
        }
          <Button
            onClick={() => setTwitterDlgOpen(true)}
              color="primary"
                disabled={!isSignedIn ? true : false}
                startIcon={<TwitterIcon/>}
                style={{ marginTop: "1rem", marginBottom: "1rem", marginLeft: "2rem" }}
                >
            シェアする
          </Button>
        {
          isSignedIn && currentUser?.id === dreamDiary?.userId ? (
            <>
              <IconButton
                    color="primary"
                    to={`/dreamdiaries/${params.id}/edit`}
                    component={Link}
                  >
                    <EditIcon />
              </IconButton>
              <IconButton
                    color="secondary"
                    onClick={() => setDlgOpen(true)}
                  >
                    <Delete />
              </IconButton>
            </>
          ) : (<></>)
        }
          <Grid container justify="center" style={{alignItems: "center", marginBottom:"2rem", marginTop: "1rem"}}>
            作者：　
          <Avatar
            alt="avatar"
            src={dreamDiary?.user === null ? '' : dreamDiary?.user.image.url}
            className={classes.avatar}
          />
          <Typography variant="body1" component="p">
            {dreamDiary?.user === null ? '退会済みユーザー' : dreamDiary?.user.name}
          </Typography>
          </Grid>
        </div>
        <Box style={{width: "800px", textAlign: "center", margin: "auto"}}>
          <Button
            component={Link}
            to={fromPage ? `/dreamdiaries?page=${fromPage}` : "/dreamdiaries"}
          >
            ▶︎一覧画面に戻る
          </Button>
          <Button
            component={Link}
            to="/mypage"
          >
            ▶︎マイページに戻る
          </Button>
        </Box>
        <Divider style={{ marginTop: "0.5rem"}}/>
        {
          isSignedIn && !currentUser?.isGuest ? (
            <>
        <form noValidate autoComplete="off">
          <Box style={{width: "600px", margin: "auto"}}>
          <h3>コメント</h3>
          <TextField
            placeholder="コメントする"
            variant="outlined"
            multiline
            fullWidth
            rows="2"
            value={commentBody}
            margin="dense"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCommentBody(e.target.value)
            }}
          />
          <Button
            onClick={handleCommentSubmit}
            color="primary"
            disabled={!commentBody ? true : false}
            style={{float: "right"}}
          >
            送信
          </Button>
          </Box>
          </form>
          </>
          ) : (<></>)
        }
          <Grid container style={{width: "500px", margin: "2.5rem auto"}}>
          {
          comments.map((comment: Comment, index: number) => {
              return (
                <Grid item container key={index} justify="center">
                  <CommentArea
                    index={index}
                    body={comment.body}
                    createdAt={comment.createdAt}
                    dreamDiaryId={comment.dreamDiaryId}
                    userId={comment.user === null ? 0 : comment.user.id}
                    userName={comment.user === null ? '退会済みユーザー' : comment.user.name}
                    userImage={comment.user === null ? '' : comment.user.image.url}
                    comments={comments}
                    setComments={setComments}
                    setSuccessOpen={setSuccessOpen}
                    setSuccessMsg={setSuccessMsg}
                    setAlertOpen={setAlertOpen}
                    setAlertMsg={setAlertMsg}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          </>
          ) : (<></>) 
        }
        </>
      )
    }
    {
      isTabletSite && (
        <>
     {
        !loading ? (
          <>
          <div style={{textAlign: "center"}}>
              <img
              src={dreamDiary?.diaryOgp}
              alt="diaryOgp img"
              className={classes.tPreview}
            />
          </div>
          <div  className={classes.submitBtn}>
          <Button
            onClick={
              currentUserLiked ? handleDestroyLike : handleCreateLike}
              color="secondary"
              startIcon={
                currentUserLiked ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)}
                disabled={!isSignedIn ? true : false}
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                >
            {`${likesCount}`}
          </Button>
          {
            isSignedIn ? (
            <>
          <Button
            onClick={
              currentUserBookmarked ? handleDestroyBookmark : handleCreateBookmark}
            color="secondary"
            startIcon={
              currentUserBookmarked ? (<BookmarkIcon />) : (<BookmarkBorderIcon />)}
            disabled={currentUser?.isGuest ? true : false}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            {currentUserBookmarked ? "お気に入り解除" : "お気に入り登録"}
          </Button>
          </>
          ):(<></>)
        }
          <Button
            onClick={() => setTwitterDlgOpen(true)}
              color="primary"
                disabled={!isSignedIn ? true : false}
                startIcon={<TwitterIcon/>}
                style={{ marginTop: "1rem", marginBottom: "1rem", marginLeft: "2rem" }}
                >
            シェアする
          </Button>
        {
          isSignedIn && currentUser?.id === dreamDiary?.userId ? (
            <>
              <IconButton
                    color="primary"
                    to={`/dreamdiaries/${params.id}/edit`}
                    component={Link}
                  >
                    <EditIcon />
              </IconButton>
              <IconButton
                    color="secondary"
                    onClick={() => setDlgOpen(true)}
                  >
                    <Delete />
              </IconButton>
            </>
          ) : (<></>)
        }
          <Grid container justify="center" style={{alignItems: "center", marginBottom:"2rem", marginTop: "1rem"}}>
            作者：　
          <Avatar
            alt="avatar"
            src={dreamDiary?.user === null ? '' : dreamDiary?.user.image.url}
            className={classes.avatar}
          />
          <Typography variant="body1" component="p">
            {dreamDiary?.user === null ? '退会済みユーザー' : dreamDiary?.user.name}
          </Typography>
          </Grid>
        </div>
        <Box style={{width: "800px", textAlign: "center", margin: "auto"}}>
          <Button
            component={Link}
            to={fromPage ? `/dreamdiaries?page=${fromPage}` : "/dreamdiaries"}
          >
            ▶︎一覧画面に戻る
          </Button>
          <Button
            component={Link}
            to="/mypage"
          >
            ▶︎マイページに戻る
          </Button>
        </Box>
        <Divider style={{ marginTop: "0.5rem"}}/>
        {
          isSignedIn && !currentUser?.isGuest ? (
            <>
        <form noValidate autoComplete="off">
          <Box style={{width: "600px", margin: "auto"}}>
          <h3>コメント</h3>
          <TextField
            placeholder="コメントする"
            variant="outlined"
            multiline
            fullWidth
            rows="2"
            value={commentBody}
            margin="dense"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCommentBody(e.target.value)
            }}
          />
          <Button
            onClick={handleCommentSubmit}
            color="primary"
            disabled={!commentBody ? true : false}
            style={{float: "right"}}
          >
            送信
          </Button>
          </Box>
          </form>
          </>
          ) : (<></>)
        }
          <Grid container style={{width: "500px", margin: "2.5rem auto"}}>
          {
          comments.map((comment: Comment, index: number) => {
              return (
                <Grid item container key={index} justify="center">
                  <CommentArea
                    index={index}
                    body={comment.body}
                    createdAt={comment.createdAt}
                    dreamDiaryId={comment.dreamDiaryId}
                    userId={comment.user === null ? 0 : comment.user.id}
                    userName={comment.user === null ? '退会済みユーザー' : comment.user.name}
                    userImage={comment.user === null ? '' : comment.user.image.url}
                    comments={comments}
                    setComments={setComments}
                    setSuccessOpen={setSuccessOpen}
                    setSuccessMsg={setSuccessMsg}
                    setAlertOpen={setAlertOpen}
                    setAlertMsg={setAlertMsg}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          </>
          ) : (<></>) 
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
          <div style={{textAlign: "center"}}>
              <img
              src={dreamDiary?.diaryOgp}
              alt="diaryOgp img"
              className={classes.mPreview}
            />
          </div>
          <div  className={classes.submitBtn}>
          <Button
            onClick={
              currentUserLiked ? handleDestroyLike : handleCreateLike}
              color="secondary"
              startIcon={
                currentUserLiked ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)}
                disabled={!isSignedIn ? true : false}
                style={{ marginTop: "0.3rem", marginBottom: "0.3rem" }}
                >
            {`${likesCount}`}
          </Button>
          {
            isSignedIn ? (
            <>
          <Button
            onClick={
              currentUserBookmarked ? handleDestroyBookmark : handleCreateBookmark}
            color="secondary"
            disabled={currentUser?.isGuest ? true : false}
            style={{ marginTop: "0.3rem", marginBottom: "0.3rem" }}
          >
            {currentUserBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </Button>
          </>
          ):(<></>)
        }
        {
          isSignedIn && currentUser?.id === dreamDiary?.userId ? (
            <>
              <IconButton
                    color="primary"
                    to={`/dreamdiaries/${params.id}/edit`}
                    component={Link}
                  >
                    <EditIcon />
              </IconButton>
              <IconButton
                    color="secondary"
                    onClick={() => setDlgOpen(true)}
                  >
                    <Delete />
              </IconButton>
            </>
          ) : (<></>)
        }
        <Button
        onClick={() => setTwitterDlgOpen(true)}
          color="primary"
          disabled={!isSignedIn ? true : false}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
          <TwitterIcon/>
        </Button>
          <Grid container justify="center" style={{alignItems: "center", marginBottom:"0.5rem", marginTop: "0.3rem"}}>
            作者：　
          <Avatar
            alt="avatar"
            src={dreamDiary?.user === null ? '' : dreamDiary?.user.image.url}
            className={classes.mAvatar}
          />
          <Typography variant="body1" component="p">
            {dreamDiary?.user === null ? '退会済みユーザー' : dreamDiary?.user.name}
          </Typography>
          </Grid>
        </div>
        <Box style={{width: "100%", textAlign: "center", margin: "auto"}}>
          <Button
            component={Link}
            to={fromPage ? `/dreamdiaries?page=${fromPage}` : "/dreamdiaries"}
            >
            ▶︎一覧画面に戻る
          </Button>
          <Button
            component={Link}
            to="/mypage"
          >
            ▶︎マイページに戻る
          </Button>
        </Box>
        <Divider style={{ marginTop: "0.5rem"}}/>
        {
          isSignedIn && !currentUser?.isGuest ? (
            <>
        <form noValidate autoComplete="off">
          <Box style={{width: "100%", margin: "auto"}}>
          <h3 style={{marginBlockStart: "0.5rem", marginBlockEnd: "0"}}>コメント</h3>
          <TextField
            placeholder="コメントする"
            variant="outlined"
            multiline
            fullWidth
            rows="2"
            value={commentBody}
            margin="dense"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCommentBody(e.target.value)
            }}
          />
          <Button
            onClick={handleCommentSubmit}
            color="primary"
            disabled={!commentBody ? true : false}
            style={{float: "right"}}
          >
            送信
          </Button>
          </Box>
          </form>
          </>
          ) : (<></>)
        }
          <Grid container style={{width: "90%", margin: "2.5rem auto"}}>
          {
          comments.map((comment: Comment, index: number) => {
              return (
                <Grid item container key={index} justify="center">
                  <CommentArea
                    index={index}
                    body={comment.body}
                    createdAt={comment.createdAt}
                    dreamDiaryId={comment.dreamDiaryId}
                    userId={comment.user === null ? 0 : comment.user.id}
                    userName={comment.user === null ? '退会済みユーザー' : comment.user.name}
                    userImage={comment.user === null ? '' : comment.user.image.url}
                    comments={comments}
                    setComments={setComments}
                    setSuccessOpen={setSuccessOpen}
                    setSuccessMsg={setSuccessMsg}
                    setAlertOpen={setAlertOpen}
                    setAlertMsg={setAlertMsg}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          </>
          ) : (<></>) 
        }
        </>
      )
    }
    <CommonDialog // 削除確認ダイアログ
      message={"本当に削除しますか？"}
      open={DlgOpen}
      setOpen={setDlgOpen}
      doYes={handleDeleteDreamDiary}
    />
    <CommonDialog // tweet確認ダイアログ
      message={`このボタンからツイッターシェアを行う場合、\n夢絵日記twitter公式アカウントにて日記画像がツイートされます。\n「はい」を選ぶと、しばらくしてTwitterに移動します。`}
      open={twitterDlgOpen}
      setOpen={setTwitterDlgOpen}
      doYes={handleTwitterSubmit}
    />
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

export default DreamDiaryShow