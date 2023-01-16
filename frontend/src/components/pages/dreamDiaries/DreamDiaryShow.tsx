import { Button, IconButton, makeStyles, Theme } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import { DreamDiary, Like, BookmarkData } from "../../../interfaces"
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
  }
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
  const handleCreateLike = async () => {
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
    const handleDestroyLike = async () => {
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
  const handleCreateBookmark = async () => {
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
  const handleDestroyBookmark = async () => {
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
    if (currentUser?.id !== dreamDiary?.userId) {
      navigation('/dreamdiaries')
    }
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
            onClick={
              currentUserLiked ? ()=>(handleDestroyLike()) : ()=>(handleCreateLike())}
            color="secondary"
            startIcon={
              currentUserLiked ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)}
            disabled={!currentUser || !currentUser?.isGuest ? false : true}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            {`${likesCount}`}
          </Button>
          <Button
            onClick={
              currentUserBookmarked ? ()=>(handleDestroyBookmark()) : ()=>(handleCreateBookmark())}
            color="secondary"
            startIcon={
              currentUserBookmarked ? (<BookmarkIcon />) : (<BookmarkBorderIcon />)}
            disabled={!currentUser || !currentUser?.isGuest ? false : true}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            {currentUserBookmarked ? "お気に入り解除" : "お気に入り登録"}
          </Button>
        </div>
          <Button
            component={Link}
            to="/dreamdiaries"
          >
            一覧画面へ戻る
          </Button>
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