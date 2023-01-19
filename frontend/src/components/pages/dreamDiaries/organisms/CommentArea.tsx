import React, { useContext } from "react"
import { AuthContext } from "../../../../App"
import { makeStyles, Theme, Typography, Avatar, Button, Grid } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import DeleteIcon from "@material-ui/icons/Delete"
import { destroyComment } from "../../../../lib/api/comments"
import { Comment } from "../../../../interfaces"

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
  setAlertMsg: Function
}

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: "0 1.5rem"
  },
  button: {
    float: "right"
  }
}))

const CommentArea = ({ index, body, createdAt, userId, userName, userImage, dreamDiaryId, comments, setComments, setAlertMsg}: CommentInfoProps) => {
  const classes = useStyles()
  const navigation = useNavigate()
  const { currentUser, setAlertMessageOpen } = useContext(AuthContext)

    //コメント削除
    const handleDeleteComment = async (index :number) => {
      const comment = comments[index]
      if (currentUser?.id !== comment.userId) {
        navigation('/dreamdiaries')
      }else{
        const res = await destroyComment(dreamDiaryId, comment.id)
        
        if (res.data.status === 200) {
          comments.splice(index, 1)
          setComments(comments)
          setAlertMsg("コメントを削除しました。")
          setAlertMessageOpen(true)
        } else {
          console.log("Failed in delete")
        }
        try {
        } catch (err) {
          console.log(err)
        }
      }
    }

  const createdDateTime = (createdAt :Date): string => {
    const c = new Date(createdAt)
    return `${c.getFullYear()}年${c.getMonth()+1}月${c.getDate()}日 ${c.getHours()}時${c.getMinutes()}分`
  }

  return (
    <>
      <Grid container style={{width:"100%", alignItems: "center"}}>
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
      <Typography variant="body2" color="textSecondary" style={{overflow: "hidden",textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
        {createdDateTime(createdAt)}
      </Typography>
      <Button
        color="primary"
        disabled={currentUser?.id === userId ? false : true}
        onClick={() => handleDeleteComment(index)}
        className={classes.button}
        >
        <DeleteIcon />
      </Button>
        </Grid>
    </>
  )
}
export default CommentArea