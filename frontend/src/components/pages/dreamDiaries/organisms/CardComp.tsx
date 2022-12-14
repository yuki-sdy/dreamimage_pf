import React from "react"
import Card from "@material-ui/core/Card"
import { CardContent, CardMedia, makeStyles, Theme, Typography, Avatar } from "@material-ui/core"
import { dream_types, impressions } from "../../../../data/dreamdiaryEnums"
import { Link } from "react-router-dom"

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
    boxShadow: "none"
  },
  inputFileButton: {
    textTransform: "none",
    color: theme.palette.primary.main
  },
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  box: {
    marginBottom: "1.5rem"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
}))

const CardComp = ({ image, title, content, dreamDate, impression, dreamType, id, userName, userImage}: CardInfoProps) => {
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
      <Card className={classes.card} style={{minWidth: "230px", width: "180px", height:"290px", margin: "10px", background:"rgba(0, 0, 0, 0)", paddingTop: 0}}>
              <CardContent style={{display: "flex", flexDirection: "column"}}>
                <CardMedia style={{textAlign: "center", paddingBottom: "10px", width: "100%"}}>
                  <img src={image} width={"90%"} style={{borderRadius: "20px"}}/>
                </CardMedia>
                <div style={{display: "flex"}}>
                <Avatar
                      alt="avatar"
                      src={userImage}
                      className={classes.avatar}
                    />
                  <div>
                  <Typography variant="h1" component="div" style={{fontSize: "17px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box",WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>
                      {title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{overflow: "hidden",textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                      {userName}
                  </Typography>
                  </div>
                </div>
                  <div style={{paddingTop: "3px"}}>
                  <Typography variant="body2" color="textSecondary" style={{overflow: "hidden",textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                      {content}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="div">
                      {`${diaryImpression(impression)}???${dreamDate}(${diaryDreamType(dreamType)})`}
                  </Typography>
                  </div>
              </CardContent>
      </Card>
      </Link>
    </div>
  )


}
export default CardComp