import { makeStyles, Theme, Box } from "@material-ui/core"
import React from "react"
import ReactPaginate from 'react-paginate'
import { DreamDiary } from "../../../../interfaces"

export interface PagenationProps {
  dreamDiaries: DreamDiary[],
  perPage: number,
  setOffset: Function,
}

const useStyles = makeStyles((theme: Theme) => ({
  pagenation: {
    marginTop: "3rem",
    display: "flex",
    justifyContent: "center",
    paddingInlineStart: 0,
    "& > li" : {
      margin: "0 4px",
      listStyle: "none",
      "& > a": {
        width: "24px",
        height: "24px",
        cursor: "pointer",
        borderRadius: "50%",
        padding: "0.5rem 0.8rem",
        "&:hover": {
          backgroundColor: "#b660cc",
          color: "white"
        }
      },
    },
  },
  active: {
    padding: "0.5rem 0",
    borderRadius: "50%",
    backgroundColor: "#b660cc",
    color: "white",
  },
  disable: {
    color: "gray",
    pointerEvents: "none"
  }
}))

const Pagenation = ({ dreamDiaries, perPage, setOffset }: PagenationProps) => {
  const classes = useStyles()
  const pageCount =Math.ceil(dreamDiaries.length / perPage)

  const handlePageClick = (e : {selected: number}) => {
    const newOffset = (e.selected * perPage) % dreamDiaries.length
    setOffset(newOffset)
  }

  return (
    <Box style={{textAlign: "center"}}>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName={classes.pagenation}
        activeClassName={classes.active}
        disabledClassName={classes.disable}
      />
    </Box>
  )
}

export default Pagenation