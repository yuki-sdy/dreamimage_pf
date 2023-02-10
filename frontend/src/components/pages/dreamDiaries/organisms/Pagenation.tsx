import { makeStyles, Theme, Box } from "@material-ui/core"
import React, { useEffect } from "react"
import ReactPaginate from 'react-paginate'
import { useNavigate, useSearchParams } from "react-router-dom"
import { DreamDiary } from "../../../../interfaces"

export interface PagenationProps {
  dreamDiaries: DreamDiary[],
  perPage: number,
  setOffset: Function,
  setPage: Function,
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

const Pagenation = ({ dreamDiaries, perPage, setOffset, setPage }: PagenationProps) => {
  const classes = useStyles()
  const pageCount =Math.ceil(dreamDiaries.length / perPage)
  const navigation = useNavigate()

  const [searchParams] = useSearchParams()
  const pageNumber = searchParams.get("page")

  const handlePageCheck = async (pageNumber: number | null) => {
    const newOffset = !(pageNumber===0) ? ((Number(pageNumber)-1) * perPage) % dreamDiaries.length : 0
    setOffset(newOffset)
  }
  useEffect(() => {
    handlePageCheck(Number(pageNumber))
    window.scrollTo(0, 0)
   }, [pageNumber])

  const handlePageClick = (e : {selected: number}) => {
    setPage(e.selected)
    navigation(`/dreamdiaries?page=${e.selected + 1}`)
  }

  return (
    <Box style={{textAlign: "center"}}>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        forcePage={pageNumber ? Number(pageNumber)-1 : 0}
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