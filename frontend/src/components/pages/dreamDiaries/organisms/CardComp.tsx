import React from "react"
import Card from "@material-ui/core/Card"
import { CardContent, CardMedia, makeStyles, Theme, Typography } from "@material-ui/core"
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
    maxWidth: 800
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
  }
}))

const CardComp = ({ image, title, content, dreamDate, impression, dreamType, id}: CardInfoProps) => {
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
      <Card className={classes.card} style={{minWidth: "250px", width: "200px", height:"310px", margin: "10px", background:"rgba(0, 0, 0, 0)"}}>
              <CardContent style={{display: "flex", flexDirection: "column"}}>
                <CardMedia style={{textAlign: "center", paddingBottom: "10px"}}>
                  <img src={image} width={"90%"}/>
                </CardMedia>
                  <Typography variant="h1" component="div" style={{fontSize: "17px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box",WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>
                      {title}
                  </Typography>
                  <div style={{paddingTop: "10px"}}>
                  <Typography variant="body2" color="textSecondary" style={{overflow: "hidden",textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                      {content}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="div">
                      {`${diaryImpression(impression)}・${dreamDate}(${diaryDreamType(dreamType)})`}
                  </Typography>
                  </div>
              </CardContent>
      </Card>
      </Link>
    </div>
  )


}
export default CardComp