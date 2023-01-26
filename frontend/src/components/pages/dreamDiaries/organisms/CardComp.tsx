import React from "react"
import Card from "@material-ui/core/Card"
import { CardContent, CardMedia, makeStyles, Theme, Typography, Avatar, Box } from "@material-ui/core"
import { dream_types, impressions } from "../../../../data/dreamdiaryEnums"
import { Link } from "react-router-dom"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"

export interface CardInfoProps {
  id: number
  image: string
  title: string
  content: string
  dreamDate: Date
  impression: number
  dreamType: number
  userName: string
  userImage: string
  likeCount: number
  commentCount: number
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    boxShadow: "none",
    width: "230px",
    height:"335px",
    alignItems:"center",
    background:"rgba(0, 0, 0, 0)",
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  media: {
    textAlign: "center",
    paddingBottom: "10px",
    width: "100%"
  },
  image: {
    borderRadius: "20px"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: "8px"
  },
  contentTypography: {
    fontSize: "17px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    width: "150px"
  },
  icon: {
    width: "16px",
    lineHeight: "16px"
  }
}))

const CardComp = ({ image, title, content, dreamDate, impression, dreamType, id, userName, userImage, likeCount, commentCount}: CardInfoProps) => {
  const classes = useStyles()

  const diaryImpression = (impression :number): string => {
    return impressions[Number(impression)]
  }

  const diaryDreamType = (dreamType :number): string => {
    return dream_types[Number(dreamType)]
  }

  return (
    <div className="product-card-top">
      <Link to={`/dreamdiaries/${id}`} className={classes.link}>
      <Card className={classes.card} style={{padding: 0}}>
        <CardContent className={classes.content}>
          <CardMedia className={classes.media}>
            <img src={image} width={"90%"} className={classes.image}/>
          </CardMedia>
          <div style={{display: "flex"}}>
          <Avatar
                alt="avatar"
                src={userImage}
                className={classes.avatar}
              />
            <div>
            <Typography variant="h1" component="div" style={{fontSize: "17px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box",WebkitLineClamp: 2, WebkitBoxOrient: "vertical", width: "150px"}}>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{overflow: "hidden",textOverflow: "ellipsis", whiteSpace: "nowrap", width: "150px"}}>
                {userName}
            </Typography>
            </div>
          </div>
            <div style={{paddingTop: "3px"}}>
            <Typography variant="body2" color="textSecondary" className={classes.contentTypography}>
              {content}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
                {`${diaryImpression(impression)}・${dreamDate}(${diaryDreamType(dreamType)}) `}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div" style={{float: "right"}}>
                <FavoriteIcon className={classes.icon}/>
                  {`${likeCount}　`}
                <ChatBubbleIcon className={classes.icon}/>
                  {`${commentCount}　`}
            </Typography>
            </div>
        </CardContent>
      </Card>
      </Link>
    </div>
  )
}
export default CardComp