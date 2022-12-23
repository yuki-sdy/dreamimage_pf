import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { DreamDiary } from "../../../interfaces"
import { getDreamDiaries } from "../../../lib/api/dreamdiaries"
import { Grid, List, ListItemText, makeStyles, Theme } from "@material-ui/core"
import AlertMessage from "../../utils/AlertMessage"
import CardComp from "./organisms/CardComp"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 340,
    maxWidth: "100%"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
}))

const DreamDiaries: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiaries, setDreamDiaries] = useState<DreamDiary[]>([])

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(location.state)

  const handleDreamDiaries = async () => {
    try {
      const res = await getDreamDiaries()

      if (res.status === 200) {
        setDreamDiaries(res.data.dreamDiaries)
      } else {
        console.log("No diary")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleDreamDiaries()
  }, [])

  return (
    <>
    <div style={ { textAlign: "right", marginBottom: "15px" } }>
      <Link to={'/dreamdiaries/new'} className={classes.link}>
        新しく日記を作る
      </Link>
    </div>
     {
        !loading ? (
          dreamDiaries.length > 0 ? (
            <>
            <h3 style={{textAlign:"center"}}>みんなの夢絵日記</h3>
            <Grid container justify="flex-start" style={{width: "100%"}}>
            {
            dreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
              return (
                <Grid item container key={index} xs={12} md={4} lg={3} sm={6} spacing={1} justify="center">
                  <CardComp
                    id={dreamDiary.id}
                    image={dreamDiary.image}
                    title={dreamDiary.title}
                    content={dreamDiary.content}
                    dreamDate={dreamDiary.dreamDate}
                    impression={dreamDiary.impression}
                    dreamType={dreamDiary.dreamType}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          </>
          ) : (<></>)
          )
        : (<></>) 
      }
      <AlertMessage // 削除後のフラッシュ
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="日記を削除しました。"
      />
    </>
  )
}

export default DreamDiaries