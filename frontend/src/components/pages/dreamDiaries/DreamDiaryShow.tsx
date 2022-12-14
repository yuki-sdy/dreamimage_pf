import { Button, makeStyles, Theme } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../App"

import { DreamDiary } from "../../../interfaces"
import { DreamDiaryDestroy, getDreamDiary } from "../../../lib/api/dreamdiaries"

const useStyles = makeStyles((theme: Theme) => ({
  linkBtn: {
    textTransform: "none"
  }
}))

const DreamDiaryShow: React.FC = () => {

  const sampleLocation = useLocation();
  const id = parseInt(sampleLocation.pathname.split('/')[2])

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiary, setDreamDiary] = useState<DreamDiary>()

  const { isSignedIn, currentUser, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigation = useNavigate();

  const handleDreamDiary = async () => {
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
    handleDreamDiary()
  }, [])

  //夢絵日記削除処理
  const handleDeleteDreamDiary = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await DreamDiaryDestroy(dreamDiary?.id)
    
    if (res.data.status === 200) {
      console.log(res)
      navigation("/dreamdiaries")
      console.log("Succeeded in delete")
    } else {
      console.log("Failed in delete")
    }

    try {
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
     {
        !loading ? (
          <>
          <div>{`title: ${dreamDiary?.title}`}</div>
          <div>{`body: ${dreamDiary?.body}`}</div>
          <div>{`state: ${dreamDiary?.state}`}</div>
          <div>{`dreamDate: ${dreamDiary?.dreamDate}`}</div>
          {
            dreamDiary?.image ? (
              <img
              src={dreamDiary?.image}
              alt="preview img"
            />
            ) : null
          }
          <div>
            <Button
              color="inherit"
              className={classes.linkBtn}
              onClick={handleDeleteDreamDiary}
            >
              この日記を削除する
            </Button>
          </div>
          </>
          ) : (<></>) 
      }
    </>
  )
}

export default DreamDiaryShow