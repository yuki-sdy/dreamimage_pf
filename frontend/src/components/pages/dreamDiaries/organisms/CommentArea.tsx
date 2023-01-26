import React, { useContext, useState } from "react"
import { AuthContext } from "../../../../App"
import { makeStyles, Theme, Typography, Avatar, Button, Grid } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { destroyComment } from "../../../../lib/api/comments"
import { Comment } from "../../../../interfaces"
import CommonDialog from "../../../utils/CommonDialog"

export interface CommentInfoProps {
  index: number
  body: string
  createdAt: Date
  userId: number
  userName: string
  userImage: string
  dreamDiaryId: number
  comments: Comment[]
  setComments: Function
  setSuccessOpen: Function
  setSuccessMsg: Function
  setAlertOpen: Function
  setAlertMsg: Function
}

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: "0 1.5rem"
  },
  button: {
    float: "right"
  },
  grid: {
    width:"100%",
    alignItems: "center"
  },
  createdAtTypography: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}))

const CommentArea = ({ index, body, createdAt, userId, userName, userImage, dreamDiaryId, comments, setComments, setSuccessOpen, setSuccessMsg, setAlertOpen,setAlertMsg }: CommentInfoProps) => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)

  const [DlgOpen, setDlgOpen] = useState<boolean>(false)

    //コメント削除
    const handleDeleteComment = async (index :number) => {
      setDlgOpen(false)
      const comment = comments[index]
      if (currentUser?.id !== comment.userId) {
        setAlertMsg("権限がありません。")
        setAlertOpen(true)
      }else{
        const res = await destroyComment(dreamDiaryId, comment.id)
        
        if (res.data.status === 200) {
          comments.splice(index, 1)
          setComments(comments)
          setSuccessMsg("コメントを削除しました。")
          setSuccessOpen(true)
        } else {
          setAlertMsg("削除できませんでした。")
          setAlertOpen(true)
        }
        try {
        } catch (err) {
          setAlertMsg("しばらく経ってからもう一度お試しください。")
          setAlertOpen(true)
        }
      }
    }

  const createdDateTime = (createdAt :Date): string => {
    const c = new Date(createdAt)
    return `${c.getFullYear()}年${c.getMonth()+1}月${c.getDate()}日 ${c.getHours()}時${c.getMinutes()}分`
  }

  return (
    <>
      <Grid container className={classes.grid}>
        <Avatar
          alt="avatar"
          src={userImage}
          className={classes.avatar}
        />
        <Typography variant="body1" style={{fontWeight: "bold"}}>
          {userName}
        </Typography>
      </Grid>
      <Grid item style={{width:"50%"}}>
      <Typography variant="body1" color="textSecondary" style={{whiteSpace: "pre-wrap"}}>
        {body}
      </Typography>
      </Grid>
      <Grid item style={{width:"100%", textAlign: "right"}}>
      <Typography variant="body2" color="textSecondary" className={classes.createdAtTypography}>
        {createdDateTime(createdAt)}
      </Typography>
      {
        currentUser?.id === userId ? (
        <Button
          color="primary"
          onClick={() => setDlgOpen(true)}
          className={classes.button}
          >
          <DeleteIcon />
        </Button>
        ):(<></>)
      }
      <CommonDialog // 削除確認ダイアログ
        message={"本当に削除しますか？"}
        open={DlgOpen}
        setOpen={setDlgOpen}
        doYes={() => handleDeleteComment(index)}
      />
        </Grid>
    </>
  )
}
export default CommentArea