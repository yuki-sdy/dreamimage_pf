import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { DreamDiary } from "../../../interfaces"
import { getDreamDiaries } from "../../../lib/api/dreamdiaries"
import { Box, Grid, makeStyles, Theme } from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress'
import TitleImage from '../../../images/indextitle.png'
import AlertMessage from "../../utils/AlertMessage"
import CardComp from "./organisms/CardComp"
import Pagenation from "./organisms/Pagenation"

const useStyles = makeStyles((theme: Theme) => ({
}))

const DreamDiaries: React.FC = () => {
  const location = useLocation()
  const classes = useStyles()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiaries, setDreamDiaries] = useState<DreamDiary[]>([])
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(location.state)

  const [successOpen, setSuccessOpen]
   = useState<boolean>(location.state ? (location.state.successOpen) : (false))
  const [successMsg, setSuccessMsg]
   = useState<string>(location.state ? (location.state.successMsg) : (""))
  const [alertOpen, setAlertOpen]
   = useState<boolean>(location.state ? (location.state.alertOpen) : (false))
  const [alertMsg, setAlertMsg]
   = useState<string>(location.state ? (location.state.alertMsg) : (""))

  const [offset, setOffset] = useState<number>(0)
  const perPage = 18
  const currentDreamDiaries = dreamDiaries.slice(offset, offset + perPage)

  const handleDreamDiaries = async () => {
    try {
      const res = await getDreamDiaries()

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
            <div style={{textAlign: "center", margin: "1.5rem"}}>
            <img src={TitleImage} style={{width: "500px"}}/>
            </div>
            <Grid container style={{minWidth: "1200px"}}>
            {
            currentDreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
              return (
                <Grid item container key={index} xs={2}>
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
                    commentCount={dreamDiary.commentCount}
                    />
                </Grid>
              )
            })
          }
          </Grid>
          <Pagenation
            dreamDiaries={dreamDiaries}
            perPage={perPage}
            setOffset={setOffset}
           />
          </>
          ) : (
          <>
          <h3>日記がありません！</h3>
          </>)
          )
        : (
        <Box style={{margin: "auto", padding: "3rem"}}>
          <CircularProgress />
        </Box>
        ) 
      }
      <AlertMessage // 削除後のフラッシュ
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="success"
        message="日記を削除しました。"
      />
      <AlertMessage
        open={alertOpen}
        setOpen={setAlertOpen}
        severity="error"
        message={alertMsg}
      />
      <AlertMessage
        open={successOpen}
        setOpen={setSuccessOpen}
        severity="success"
        message={successMsg}
      />
    </>
  )
}

export default DreamDiaries