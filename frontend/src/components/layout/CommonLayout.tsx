import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Header from "./Header"
import Footer from "./Footer"

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem",
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
    <body style={{backgroundColor: "#f5f1f9"}}>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            <Grid item>
              {children}
            </Grid>   
          </Grid>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </body>
    </>
  )
}

export default CommonLayout