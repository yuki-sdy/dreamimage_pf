import React, { useContext, useState } from "react"
import { Button, makeStyles, Theme } from "@material-ui/core"
import { useLocation, useNavigate } from "react-router-dom"

import { DreamDiaryFormData } from "../../../interfaces"
import { DreamDiaryBack, DreamDiaryCreate, DreamDiaryUpdate } from "../../../lib/api/dreamdiaries"
import { AuthContext } from "../../../App"
import AlertMessage from "../../utils/AlertMessage"
import { useMediaQueryContext } from "../../provider/MediaQueryPrivider"


const useStyles = makeStyles((theme: Theme) => ({
  preview: {
    width: "65%"
  },
  mPreview: {
    width: "90%"
  },
  text: {
    textAlign: "center",
    paddingTop: "20px",
    fontSize: "20px"
  },
  mText: {
    textAlign: "center",
    fontSize: "16px"
  },
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "center",
    flexGrow: 1,
    textTransform: "none"
  },
  mSubmitBtn: {
    paddingTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    gap: "8px"
  },
}))

const DreamDiaryPreview: React.FC = () => {
  const classes = useStyles()
  const navigation = useNavigate()
  const location = useLocation()
  const { currentUser } = useContext(AuthContext)
  const { isMobileSite, isPcSite } = useMediaQueryContext()

  const [dreamDiaryForm, setDreamDiaryForm] = useState<DreamDiaryFormData>(location.state.dreamDiary)
  const [userId, setUserId] = useState<number | undefined>(location.state.dreamDiary.userId)

  const [paramsId, setParamsId] = useState<Number>(location.state.dreamDiaryId)
  const [diaryOgp, setDiaryOgp] = useState<string>(location.state.diaryOgp)

  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertMsg, setAlertMsg] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    try {
      if (paramsId) {
        if (currentUser?.id !== userId) {
          navigation('/dreamdiaries',
          {state: {alertOpen: true, alertMsg: "権限がありません。"}})
        }else{
          const res = await DreamDiaryUpdate(Number(paramsId), dreamDiaryForm, String(diaryOgp))
          
          if (res.status === 200) {
            navigation(`/dreamdiaries/${paramsId}`,
            {state: {successOpen: true, successMsg: "日記を更新しました！"}})
          }
        }
      } else {
         const res = await DreamDiaryCreate(dreamDiaryForm, String(diaryOgp))
   
         if (res.status === 200) {
           navigation(`/dreamdiaries/${res.data.id}`,
           {state: {successOpen: true, successMsg: "日記を作成しました！"}})
         }
       }
    } catch (err) {
      setAlertMsg("内容を確かめてください。")
      setAlertOpen(true)
    }
  }

  const handleBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    try {
      const res = await DreamDiaryBack(dreamDiaryForm)
      console.log(res)

      if (res.status === 200) {
        navigation('/dreamdiaries/back', 
        { state: { dreamDiary: dreamDiaryForm, dreamDiaryId: paramsId }})
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    {
      isPcSite && (
        <>
          <div className={classes.text}>
            この内容でよろしいですか？
          </div>
          <div style={{textAlign: "center"}}>
              <img
                src={diaryOgp}
                alt="preview img"
                className={classes.preview}
              />
          </div>
          <div className={classes.submitBtn}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={handleBack}
            >
            編集画面へ戻る
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              onClick={handleSubmit}
              style={{marginLeft: "80px"}}
            >
            { paramsId ? ("この内容で更新する"):("この内容で作成する") }
            </Button>
          </div>
        </>
      )
    }
    {
      isMobileSite && (
        <>
        <div style={{height: "500px"}}>
          <div className={classes.mText}>
            この内容でよろしいですか？
          </div>
          <div style={{textAlign: "center"}}>
              <img
                src={diaryOgp}
                alt="preview img"
                className={classes.mPreview}
              />
          </div>
          <div className={classes.mSubmitBtn}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={handleBack}
            >
            編集画面へ戻る
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              onClick={handleSubmit}
            >
            { paramsId ? ("この内容で更新する"):("この内容で作成する") }
            </Button>
          </div>
        </div>
        </>
      )
    }
    <AlertMessage
      open={alertOpen}
      setOpen={setAlertOpen}
      severity="error"
      message={alertMsg}
    />
    </>
  )
}

export default DreamDiaryPreview