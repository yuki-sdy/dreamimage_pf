import { Button, makeStyles, Theme } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { dream_types, impressions } from "../../../data/dreamdiaryEnums"

import { DreamDiary } from "../../../interfaces"
import { DreamDiaryDestroy, getDreamDiary } from "../../../lib/api/dreamdiaries"
import AlertMessage from "../../utils/AlertMessage"
import CommonDialog from "../../utils/CommonDialog"

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
  }
}))

const DreamDiaryShow: React.FC = () => {
  const params = useParams()
  const location = useLocation()
  const classes = useStyles()
  const navigation = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiary, setDreamDiary] = useState<DreamDiary>()

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(location.state)
  const [DlgOpen, setDlgOpen] = useState<boolean>(false)

  const handleDreamDiary = async () => {
    try {
      const res = await getDreamDiary(Number(params.id))
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

  const diaryImpression = (): string => {
    return impressions[Number(dreamDiary?.impression)]
  }

  const diaryDreamType = (): string => {
    return dream_types[Number(dreamDiary?.dreamType)]
  }

  //夢絵日記削除処理
  const handleDeleteDreamDiary = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await DreamDiaryDestroy(dreamDiary?.id)
    
    if (res.data.status === 200) {
      navigation("/dreamdiaries", { state: true})
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
          <div style={{textAlign: "center"}}>
              <img
              src={dreamDiary?.diaryOgp}
              alt="diaryOgp img"
              className={classes.preview}
            />
          </div>
          <div>
            <Button
              color="inherit"
              className={classes.linkBtn}
              onClick={() => setDlgOpen(true)}
            >
              この日記を削除する
            </Button>
            <Link to={`/dreamdiaries/${params.id}/edit`} className={classes.link}>
              編集する
            </Link>
          </div>
          <CommonDialog // 削除確認ダイアログ
            message={"本当に削除しますか？"}
            open={DlgOpen}
            setOpen={setDlgOpen}
            doYes={handleDeleteDreamDiary}
          />
          <AlertMessage // 作成や更新後のフラッシュ
            open={alertMessageOpen}
            setOpen={setAlertMessageOpen}
            severity="success"
            message="日記を作成しました。"
          />
          </>
          ) : (<></>) 
      }
    </>
  )
}

export default DreamDiaryShow