import { Button, IconButton, makeStyles, Theme } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { dream_types, impressions } from "../../../data/dreamdiaryEnums"

import { DreamDiary } from "../../../interfaces"
import { DreamDiaryDestroy, getDreamDiary } from "../../../lib/api/dreamdiaries"
import AlertMessage from "../../utils/AlertMessage"
import CommonDialog from "../../utils/CommonDialog"

import Delete from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
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
  submitBtn: {
    textAlign: "center",
  }
}))

const DreamDiaryShow: React.FC = () => {
  const { currentUser, isSignedIn, alertMessageOpen, setAlertMessageOpen } = useContext(AuthContext)
  const params = useParams()
  const location = useLocation()
  const classes = useStyles()
  const navigation = useNavigate()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiary, setDreamDiary] = useState<DreamDiary>()

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
    if (currentUser?.id !== dreamDiary?.userId) {
      navigation('/dreamdiaries')
    }
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
          {
          isSignedIn && currentUser?.id === dreamDiary?.userId ? (
          <div  className={classes.submitBtn}>
            <IconButton
                  color="primary"
                  to={`/dreamdiaries/${params.id}/edit`}
                  component={Link}
                >
                  <EditIcon />
            </IconButton>
            <IconButton
                  color="secondary"
                  onClick={() => setDlgOpen(true)}
                >
                  <Delete />
            </IconButton>
          </div>
          ) : (<></>)
        }
          <Button
            component={Link}
            to="/dreamdiaries"
          >
            一覧画面へ戻る
          </Button>
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