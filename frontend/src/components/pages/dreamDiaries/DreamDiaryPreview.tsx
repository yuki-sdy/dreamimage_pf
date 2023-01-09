import React, { useContext, useState } from "react"
import { Button, makeStyles, Theme } from "@material-ui/core"
import { useLocation, useNavigate } from "react-router-dom"

import { DreamDiaryFormData } from "../../../interfaces"
import { DreamDiaryBack, DreamDiaryCreate, DreamDiaryUpdate } from "../../../lib/api/dreamdiaries"
import { dream_types, impressions } from "../../../data/dreamdiaryEnums"
import { AuthContext } from "../../../App"


const useStyles = makeStyles((theme: Theme) => ({
  linkBtn: {
    textTransform: "none"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  preview: {
    width: "80%"
  },
  text: {
    textAlign: "center",
    paddingTop: "20px",
    fontSize: "20px"
  },
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "center",
    flexGrow: 1,
    textTransform: "none"
  },
}))

const DreamDiaryPreview: React.FC = () => {
  const classes = useStyles()
  const { currentUser, setAlertMessageOpen } = useContext(AuthContext)
  const location = useLocation()
  const [dreamDiaryForm, setDreamDiaryForm] = useState<DreamDiaryFormData>(location.state.dreamDiary)
  const [userId, setUserId] = useState<number | undefined>(location.state.dreamDiary.userId)
  const [title, setTitle] = useState<string>(location.state.dreamDiary.title)
  const [body, setBody] = useState<string>(location.state.dreamDiary.body)
  const [content, setContent] = useState<string>(location.state.dreamDiary.content)
  const [prompt, setPrompt] = useState<string>(location.state.dreamDiary.prompt)
  const [state, setState] = useState<number>(location.state.dreamDiary.state)
  const [impression, setImpression] = useState<number>(location.state.dreamDiary.impression)
  const [dreamType, setDreamType] = useState<number>(location.state.dreamDiary.dreamType)
  const [dreamDate, setDreamDate] = useState<Date | null>(location.state.dreamDiary.dreamDate)
  const [image, setImage] = useState<string>(location.state.dreamDiary.image)

  const [paramsId, setParamsId] = useState<Number>(location.state.dreamDiaryId)
  const [diaryOgp, setDiaryOgp] = useState<string>(location.state.diaryOgp)
  
  const navigation = useNavigate()

  const diaryImpression = (): string => {
    return impressions[Number(impression)]
  }

  const diaryDreamType = (): string => {
    return dream_types[Number(dreamType)]
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    try {
      if (paramsId) {
        if (currentUser?.id !== userId) {
          navigation('/dreamdiaries')
        }
        const res = await DreamDiaryUpdate(Number(paramsId), dreamDiaryForm, String(diaryOgp))
        
        if (res.status === 200) {
          navigation(`/dreamdiaries/${paramsId}`,
          { state: true })
        }
        
      } else {
         const res = await DreamDiaryCreate(dreamDiaryForm, String(diaryOgp))
   
         if (res.status === 200) {
           navigation(`/dreamdiaries/${res.data.id}`,
           { state: 'success'  })
           setAlertMessageOpen(true)
           
         }
       }
    } catch (err) {
      console.log(err)
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
        この内容で作成する
        </Button>
      </div>
    </>
  )
}

export default DreamDiaryPreview