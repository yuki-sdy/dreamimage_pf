import React from "react"
import { Link } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"


const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  footer: {
    height: "200px",
    backgroundImage: "url(/footer.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  linkBtn: {
    textTransform: "none"
  },
}))

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
    <div className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" to="/">
          Your Website
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
    </>
  )
}
export default Footer