import React, { useEffect, useState } from "react"
import { Button, makeStyles, Theme } from "@material-ui/core"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../App"

import { DreamDiary, DreamDiaryFormData } from "../../../interfaces"
import { DreamDiaryBack, DreamDiaryCreate } from "../../../lib/api/dreamdiaries"


const DreamDiaryPreview: React.FC = () => {
  const location = useLocation()
  const [dreamDiaryForm, setDreamDiaryForm] = useState<DreamDiaryFormData>(location.state.dreamDiary)
  const [title, setTitle] = useState<string>(location.state.dreamDiary.title)
  const [body, setBody] = useState<string>(location.state.dreamDiary.body)

  const navigation = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    try {
      const res = await DreamDiaryCreate(dreamDiaryForm)
      console.log(res)

      if (res.status === 200) {
        navigation(`/dreamdiaries/${res.data.id}`)
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
        navigation('/dreamdiaries/back', { state: { dreamDiary: dreamDiaryForm }})
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div>プレビュー</div>
      <div>{`title: ${title}`}</div>
      <div>{`body: ${body}`}</div>
      {/* <div>{`prompt: ${dreamDiary?.prompt}`}</div>
      <div>{`state: ${dreamDiary?.state}`}</div>
      <div>{`impression: ${dreamDiary?.impression}`}</div>
      <div>{`dreamType: ${dreamDiary?.dreamType}`}</div>
      <div>{`dreamDate: ${dreamDiary?.dreamDate}`}</div> */}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleBack}
      >
      戻る
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
      >
      送信
      </Button>
    </>
  )
}

export default DreamDiaryPreview