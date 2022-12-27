import React, { useContext, useState } from "react"
import { Avatar, Box, Button, Divider, makeStyles, Menu, MenuItem, Theme, Tooltip } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"
import Cookies from "js-cookie"
import { signOut } from "../../lib/api/auth"

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: "0 20px 0 12px"
  },
  menu: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    }
  }
}))

const AccountMenu: React.FC = () => {
  const classes = useStyles()
  const { setIsSignedIn } = useContext(AuthContext)
  const navigation = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (e :any) => {
    setAnchorEl(e.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {

    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigation("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box className={classes.box}>
        <Tooltip title="アカウント">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    {/* ドロップダウンアイテム */}
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        getContentAnchorEl={null}
        PaperProps={{
          elevation: 0
        }}
        className={classes.menu}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem
          component={Link}
          to="/profile"
          color="inherit"
        >
          プロフィール
        </MenuItem>
        <MenuItem
          component={Link}
          to="/mypage"
          color="inherit"
        >
          マイページ
        </MenuItem>
        <Divider />
        <MenuItem
          component={Button}
          color="inherit"
          onClick={handleSignOut}
        >
          ログアウト
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu