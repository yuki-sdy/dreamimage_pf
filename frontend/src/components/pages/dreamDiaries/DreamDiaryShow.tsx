import { Button, IconButton, makeStyles, Theme } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import { DreamDiary, Like } from "../../../interfaces"
import { DreamDiaryDestroy, getDreamDiary } from "../../../lib/api/dreamdiaries"
import AlertMessage from "../../utils/AlertMessage"
import CommonDialog from "../../utils/CommonDialog"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"

import Delete from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { AuthContext } from "../../../App"
import { createLike, destroyLike } from "../../../lib/api/likes"

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
  const [currentUserLiked, setCurrentUserLiked] = useState<boolean>(false)
  const [dreamDiary, setDreamDiary] = useState<DreamDiary>()
  const [likes, setLikes] = useState<Like[]>([])
  const [likesCount, setLikesCount] = useState<number>(0)
  const [isLikedDiary, setIsLikedDiary] = useState<Like>()

  const [DlgOpen, setDlgOpen] = useState<boolean>(false)

  const handleDreamDiary = async () => {
    try {
      const res = await getDreamDiary(Number(params.id))
      console.log(res)
      
      if (res.status === 200) {
        setDreamDiary(res.data)
        setLikesCount(res.data.likes.length)
        setLikes(res.data.likes)

        // いいねがあるかどうか判定
        const likes = res.data.likes
        if (likes?.find((e: any)=> e.userId === currentUser?.id)) {
          setCurrentUserLiked(true)
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

      } else {
        console.log("Failed")
      }
        const count = likesCount + 1
        setLikesCount(count)
        setCurrentUserLiked(true)
      } catch (err) {
        console.log(err)
      }
    }
    
    // いいね削除
    const handleDestroyLike = async () => {
      setIsLikedDiary(likes?.find(e => e.userId === currentUser?.id))
      try {
        const res = await destroyLike(dreamDiary?.id, isLikedDiary?.id)
        console.log(res)
        
        if (res?.status === 200) {
        setLikes(res.data.likes)
        
      } else {
        console.log("Failed")
      }
      const count = likesCount - 1
      setLikesCount(count)
      setCurrentUserLiked(false)
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
            disabled={!currentUser?.isGuest ? false : true}
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            {`${likesCount}`}
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
            message="日記を作成しました。"
          />
          </>
          ) : (<></>) 
      }
    </>
  )
}

export default DreamDiaryShow