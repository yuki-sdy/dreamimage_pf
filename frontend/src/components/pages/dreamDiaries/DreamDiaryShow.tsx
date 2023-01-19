import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, makeStyles, TextField, Theme, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import { DreamDiary, Like, BookmarkData, Comment, CommentData } from "../../../interfaces"
import { DreamDiaryDestroy, getDreamDiary } from "../../../lib/api/dreamdiaries"
import AlertMessage from "../../utils/AlertMessage"
import CommonDialog from "../../utils/CommonDialog"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import Delete from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { AuthContext } from "../../../App"
import { createLike, destroyLike } from "../../../lib/api/likes"
import { createBookmark, destroyBookmark } from "../../../lib/api/bookmarks"
import { createComment, destroyComment } from "../../../lib/api/comments"
import CommentArea from "./organisms/CommentArea"

const useStyles = makeStyles((theme: Theme) => ({
  linkBtn: {
    textTransform: "none"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  preview: {
    width: "80%"
  },
  submitBtn: {
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: "1rem"
  },
}))

const DreamDiaryShow: React.FC = () => {
  const { currentUser, isSignedIn, alertMessageOpen, setAlertMessageOpen } = useContext(AuthContext)
  const params = useParams()
  const classes = useStyles()
  const navigation = useNavigate()

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

  const [DlgOpen, setDlgOpen] = useState<boolean>(false)
  const [alertMsg, setAlertMsg] = useState<string>("日記を作成しました。")

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
      console.log(err)
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
        console.log("Failed")
      }
      } catch (err) {
        console.log(err)
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
          console.log("Failed")
        }
    } catch (err) {
      console.log(err)
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
        setAlertMsg("お気に入りに登録しました。")
        setAlertMessageOpen(true)
        
      } else {
        console.log("Failed")
      }
    } catch (err) {
      console.log(err)
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
        setAlertMsg("お気に入りから削除しました。")
        setAlertMessageOpen(true)
        
      } else {
        console.log("Failed")
      }
    } catch (err) {
      console.log(err)
    }
  }

  //夢絵日記削除処理
  const handleDeleteDreamDiary = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (currentUser?.id !== dreamDiary?.userId) {
      navigation('/dreamdiaries')
    }else{
      const res = await DreamDiaryDestroy(dreamDiary?.id)
      
      if (res.data.status === 200) {
        navigation("/dreamdiaries", { state: true})
      } else {
        console.log("Failed in delete")
      }
  
      try {
      } catch (err) {
        console.log(err)
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
        setAlertMsg("コメントを投稿しました。")
        setAlertMessageOpen(true)
        setCommentBody("")
        
      } else {
        console.log("Failed")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
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
                disabled={!currentUser ? true : false}
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                >
            {`${likesCount}`}
          </Button>
          {
            currentUser ? (
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
            to="/dreamdiaries"
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
                    setAlertMsg={setAlertMsg}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          <CommonDialog // 削除確認ダイアログ
            message={"本当に削除しますか？"}
            open={DlgOpen}
            setOpen={setDlgOpen}
            doYes={handleDeleteDreamDiary}
          />
          <AlertMessage // 作成や更新後のフラッシュ
            open={alertMessageOpen}
            setOpen={setAlertMessageOpen}
            severity="success"
            message={alertMsg}
          />
          </>
          ) : (<></>) 
      }
    </>
  )
}

export default DreamDiaryShow