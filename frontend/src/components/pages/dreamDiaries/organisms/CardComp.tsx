import React from "react"
import Card from "@material-ui/core/Card"
import { CardContent, CardMedia, makeStyles, Theme, Typography, Avatar, Box } from "@material-ui/core"
import { dream_types, impressions } from "../../../../data/dreamdiaryEnums"
import { Link } from "react-router-dom"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import { useMediaQueryContext } from "../../../provider/MediaQueryPrivider"

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
    height:"370px",
    alignItems:"center",
    background:"rgba(0, 0, 0, 0)",
  },
  mCard: {
    padding: theme.spacing(2),
    boxShadow: "none",
    height:"390px",
    alignItems:"center",
    background:"rgba(0, 0, 0, 0)",
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  mContent: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    margin: "auto",
    padding: 0,
  },
  media: {
    textAlign: "center",
    paddingBottom: "10px",
    width: "100%"
  },
  mMedia: {
    paddingBottom: "5px",
    width: "112%",

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
  typography: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  },
  icon: {
    width: "16px",
    lineHeight: "16px"
  }
}))

const CardComp = ({ image, title, content, dreamDate, impression, dreamType, id, userName, userImage, likeCount, commentCount}: CardInfoProps) => {
  const classes = useStyles()
  const { isMobileSite, isTabletSite, isPcSite } = useMediaQueryContext()

  const diaryImpression = (impression :number): string => {
    return impressions[Number(impression)]
  }

  const diaryDreamType = (dreamType :number): string => {
    return dream_types[Number(dreamType)]
  }

  return (
    <>
    {
      isPcSite && (
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
              <Typography variant="h1" component="div" className={classes.typography} style={{fontSize: "17px", width: "150px"}}>
                  {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.typography} style={{fontSize: "14px", width: "150px", WebkitLineClamp: 1}}>
                  {userName}
              </Typography>
              </div>
            </div>
              <div style={{paddingTop: "3px"}}>
              <Typography variant="body2" color="textSecondary" className={classes.typography} style={{fontSize: "12px", width: "170px"}}>
                {content}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                  {`${diaryImpression(impression)}・${dreamDate}(${diaryDreamType(dreamType)}) `}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div" style={{float: "right"}}>
                  <FavoriteIcon className={classes.icon}/>
                    {`${likeCount}　`}
                  <ChatBubbleIcon className={classes.icon}/>
                    {`${commentCount}`}
              </Typography>
              </div>
          </CardContent>
        </Card>
        </Link>
      </div>
      )
    }
    {
      isTabletSite && (
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
              <Typography variant="h1" component="div" className={classes.typography} style={{fontSize: "17px", width: "150px"}}>
                  {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.typography} style={{fontSize: "14px", width: "150px"}}>
                  {userName}
              </Typography>
              </div>
            </div>
              <div style={{paddingTop: "3px"}}>
              <Typography variant="body2" color="textSecondary" className={classes.typography} style={{fontSize: "12px", width: "170px"}}>
                {content}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                  {`${diaryImpression(impression)}・${dreamDate}(${diaryDreamType(dreamType)}) `}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div" style={{float: "right"}}>
                  <FavoriteIcon className={classes.icon}/>
                    {`${likeCount}　`}
                  <ChatBubbleIcon className={classes.icon}/>
                    {`${commentCount}`}
              </Typography>
              </div>
          </CardContent>
        </Card>
        </Link>
      </div>
      )
    }
    {
      isMobileSite && (
      <div className="product-card-top" style={{width: "100%"}}>
        <Link to={`/dreamdiaries/${id}`} className={classes.link}>
        <Card className={classes.mCard} style={{padding: 0, width: "100%"}}>
          <CardContent className={classes.mContent}>
            <CardMedia className={classes.mMedia}>
              <img src={image} width={"90%"} className={classes.image}/>
            </CardMedia>
            <div style={{display: "flex"}}>
            <Avatar
                  alt="avatar"
                  src={userImage}
                  className={classes.avatar}
                />
              <div>
              <Typography variant="h1" component="div" className={classes.typography} style={{fontSize: "14px", width: "130px", fontWeight: "bold"}}>
                  {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.typography} style={{fontSize: "13px", width: "100px", WebkitLineClamp: 1}}>
                  {userName}
              </Typography>
              </div>
            </div>
              <div style={{paddingTop: "3px"}}>
              <Typography variant="body2" color="textSecondary" className={classes.typography} style={{fontSize: "12px", width: "180px"}}>
                {content}
              </Typography>
              <Box style={{textAlign: "right"}}>
              <Typography variant="body2" color="textSecondary" component="div">
                  {`${diaryImpression(impression)}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                  {`${dreamDate}(${diaryDreamType(dreamType)}) `}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                  <FavoriteIcon className={classes.icon}/>
                    {`${likeCount}　`}
                  <ChatBubbleIcon className={classes.icon}/>
                    {`${commentCount}　`}
              </Typography>
              </Box>
              </div>
          </CardContent>
        </Card>
        </Link>
      </div>
      )
    }
    </>
  )
}
export default CardComp