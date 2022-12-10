import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { DreamDiary } from "../../../interfaces"
import { getDreamDiaries } from "../../../lib/api/dreamdiaries"
import { Grid, List, ListItemText, makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 340,
    maxWidth: "100%"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
}))

const DreamDiaries: React.FC = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState<boolean>(true)
  const [dreamDiaries, setDreamDiaries] = useState<DreamDiary[]>([])

  const handleDreamDiaries = async () => {
    try {
      const res = await getDreamDiaries()

      if (res.status === 200) {
        setDreamDiaries(res.data.dreamDiaries)
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
            dreamDiaries.map((dreamDiary: DreamDiary, index: number) => {
              return (
                <Grid container key={index} justify="center">
                  <List>
                    <Link to={`/dreamdiaries/${dreamDiary.id}`} className={classes.link}>
                      <div className={classes.root}>
                      <ListItemText primary={dreamDiary.title} />
                      </div>
                    </Link>
                  </List>
                </Grid>
              )
            })
          ) : (<></>)
        ) 
        : (<></>) 
      }
    </>
  )
}

export default DreamDiaries