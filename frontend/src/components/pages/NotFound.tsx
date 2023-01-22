import React from "react"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
  return (
    <>
    <div style={{textAlign: "center"}}>
    <h1>404</h1>
    <h2>ページが見つかりませんでした。</h2>
    <Button
      component={Link}
      to="/"
      variant="contained"
    >
      ホームに戻る
    </Button>
    </div>
    </>
  )
}

export default NotFound