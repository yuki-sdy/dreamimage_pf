import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import useSWR from "swr"

import { DreamDiary } from "../../../interfaces"
import { getDreamDiaries } from "../../../lib/api/dreamdiaries"
import { Box, Grid, makeStyles, Theme } from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress'
import TitleImage from '../../../images/indextitle.png'
import AlertMessage from "../../utils/AlertMessage"
import CardComp from "./organisms/CardComp"
import Pagenation from "./organisms/Pagenation"
import { useMediaQueryContext } from "../../provider/MediaQueryPrivider"

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
    margin: "1.5rem"
  },
  titleSize: {
    width: "500px"
  },
  mTitle: {
    textAlign: "center",
  },
  mTitleSize: {
    width: "300px"
  },
  container: {
    minWidth: "1300px"
  },
  tContainer: {
    minWidth: "800px"
  },
  mContainer: {
    minWidth: "50%"
  },
  box: {
    margin: "auto",
    padding: "3rem"
  }
}))

const DreamDiaries: React.FC = () => {
  const location = useLocation()
  const classes = useStyles()
  const { isMobileSite, isTabletSite, isPcSite } = useMediaQueryContext()

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
  const perPage = isMobileSite ? 10 : 12
  
  // const [page, setPage] = useState<number>(1)
  // const useDiaryItemsState = (page :number, perPage :number) => {
    // const res = useSWR(['DiaryItems', page, perPage], (_ :any, page :number, perPage :number) => getDreamDiaries(page, perPage))

  const useDiaryItemsState = () => {
    const res = useSWR('DiaryItems', getDreamDiaries,
    {revalidateOnMount: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    })
    return {
      ...res,
      isLoading: res.isValidating || !res.data,
    }
  }
  
  const {data: diaryItems, isLoading, mutate} = useDiaryItemsState()

  useEffect(() => {
   if(!diaryItems) {
    mutate()
   }
  }, [diaryItems?.data, mutate])

  return (
    <>
      {
        isPcSite && (
          <>
           {
             !isLoading ? (
              diaryItems?.data.length > 0 ? (
              <>
              <div className={classes.title}>
                <img src={ TitleImage } className={classes.titleSize}/>
              </div>
              <Grid container className={classes.container}>
              {
              diaryItems?.data.slice(offset, offset + perPage).map((dreamDiary: DreamDiary, index: number) => {
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
              dreamDiaries={diaryItems?.data}
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
          <Box className={classes.box}>
            <CircularProgress />
          </Box>
          ) 
        }           
      </>
    )
  }
      {
        isTabletSite && (
          <>
           {
             !isLoading ? (
              diaryItems?.data.length > 0 ? (
              <>
              <div className={classes.title}>
                <img src={ TitleImage } className={classes.titleSize}/>
              </div>
              <Grid container className={classes.tContainer}>
              {
              diaryItems?.data.slice(offset, offset + perPage).map((dreamDiary: DreamDiary, index: number) => {
                return (
                  <Grid item container key={index} xs={3}>
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
              dreamDiaries={diaryItems?.data}
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
          <Box className={classes.box}>
            <CircularProgress />
          </Box>
          ) 
        }           
      </>
    )
  }
      {
        isMobileSite && (
          <>
           {
             !isLoading ? (
              diaryItems?.data.length > 0 ? (
              <>
              <div className={classes.mTitle}>
                <img src={ TitleImage } className={classes.mTitleSize}/>
              </div>
              <Grid container className={classes.mContainer}>
              {
              diaryItems?.data.slice(offset, offset + perPage).map((dreamDiary: DreamDiary, index: number) => {
                return (
                  <Grid item container key={index} xs={6}>
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
              dreamDiaries={diaryItems?.data}
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
          <Box className={classes.box}>
            <CircularProgress />
          </Box>
          ) 
        }           
      </>
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