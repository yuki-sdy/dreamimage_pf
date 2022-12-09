import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { DreamDiary } from "../../interfaces"
import { getDreamDiary } from "../../lib/api/dreamdiaries"

const DreamDiaryShow: React.FC = () => {

  const sampleLocation = useLocation();
  const id = parseInt(sampleLocation.pathname.split('/')[2])

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiary, setDreamDiary] = useState<DreamDiary>()

  const handleDreamDiaries = async () => {
    try {
      const res = await getDreamDiary(id)
      console.log(res)

      if (res.status === 200) {
        setDreamDiary(res.data.dreamDiary)

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
          <>
          <div>{`title: ${dreamDiary?.title}`}</div>
          <div>{`body: ${dreamDiary?.body}`}</div>
          </>
          ) : (<></>) 
      }
    </>
  )
}

export default DreamDiaryShow