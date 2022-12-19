import React, { useState } from "react"
import { Button } from "@material-ui/core"
import { useLocation, useNavigate } from "react-router-dom"

import { DreamDiaryFormData } from "../../../interfaces"
import { DreamDiaryBack, DreamDiaryCreate, DreamDiaryUpdate } from "../../../lib/api/dreamdiaries"
import { dream_types, impressions } from "../../../data/dreamdiaryEnums"


const DreamDiaryPreview: React.FC = () => {
  const location = useLocation()
  const [dreamDiaryForm, setDreamDiaryForm] = useState<DreamDiaryFormData>(location.state.dreamDiary)
  const [title, setTitle] = useState<string>(location.state.dreamDiary.title)
  const [body, setBody] = useState<string>(location.state.dreamDiary.body)
  const [prompt, setPrompt] = useState<string>(location.state.dreamDiary.prompt)
  const [state, setState] = useState<number>(location.state.dreamDiary.state)
  const [impression, setImpression] = useState<number>(location.state.dreamDiary.impression)
  const [dreamType, setDreamType] = useState<number>(location.state.dreamDiary.dreamType)
  const [dreamDate, setDreamDate] = useState<Date | null>(location.state.dreamDiary.dreamDate)
  const [image, setImage] = useState<string>(location.state.dreamDiary.image)
  const [paramsId, setParamsId] = useState<Number>(location.state.dreamDiaryId)

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
        const res = await DreamDiaryUpdate(Number(paramsId), dreamDiaryForm)

        if (res.status === 200) {
          navigation(`/dreamdiaries/${paramsId}`,
          { state: true })
        }

       } else {
         const res = await DreamDiaryCreate(dreamDiaryForm)
   
         if (res.status === 200) {
           navigation(`/dreamdiaries/${res.data.id}`,
           { state: 'success'  })
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
      <div>この内容でよろしいですか？</div>
      <div>{`title: ${title}`}</div>
      <div>{`body: ${body}`}</div>
      <div>{`prompt: ${prompt}`}</div>
      <div>{`state: ${state}`}</div>
      <div>{`impression: ${diaryImpression()}`}</div>
      <div>{`dreamType: ${diaryDreamType()}`}</div>
      <div>{`dreamDate: ${dreamDate}`}</div>
      <div>
          <img
            src={image}
            alt="preview img"
          />
      </div>
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
        color="primary"
        onClick={handleSubmit}
      >
      この内容で作成する
      </Button>
    </>
  )
}

export default DreamDiaryPreview