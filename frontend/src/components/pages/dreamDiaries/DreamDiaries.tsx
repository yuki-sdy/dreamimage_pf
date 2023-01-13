import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { DreamDiary } from "../../../interfaces"
import { getDreamDiaries } from "../../../lib/api/dreamdiaries"
import { Grid, makeStyles, Theme } from "@material-ui/core"
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
  const location = useLocation()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiaries, setDreamDiaries] = useState<DreamDiary[]>([])

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(location.state)

  const handleDreamDiaries = async () => {
    try {
      const res = await getDreamDiaries()
      console.log(res.data)

      if (res.status === 200) {
        setDreamDiaries(res.data)
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
         {
        !loading ? (
          dreamDiaries.length > 0 ? (
            <>
            <h3 style={{textAlign:"center"}}>みんなの夢絵日記一覧</h3>
            <Grid container style={{width: "100%"}}>
            {
            dreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
              return (
                <Grid item container key={index} xs={12} md={4} lg={3} sm={6} style={{margin: "auto"}}justify="center">
                  <CardComp
                    id={dreamDiary.id}
                    image={dreamDiary.image}
                    title={dreamDiary.title}
                    content={dreamDiary.content}
                    dreamDate={dreamDiary.dreamDate}
                    impression={dreamDiary.impression}
                    dreamType={dreamDiary.dreamType}
                    userName={dreamDiary.user === null ? '退会済みユーザー' : dreamDiary.user.name}
                    userImage={dreamDiary.user === null ? '' : dreamDiary.user.image.url}
                    likeCount={dreamDiary.likeCount}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          </>
          ) : (
          <>
          <h3>日記がありません！</h3>
          </>)
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