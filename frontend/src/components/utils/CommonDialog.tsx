import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

interface CommonDialogProps {
  open: boolean
  setOpen:Function
  doYes: Function
  message: string
}

const CommonDialog =({open, setOpen, doYes, message} :CommonDialogProps) => {
  const handleCloseDialogMessage = () => {
    setOpen(false)
  }

  return (
      <div>
        <Dialog
            open={open}
            keepMounted
            onClose={handleCloseDialogMessage}
            aria-labelledby="common-dialog-title"
            aria-describedby="common-dialog-description"
        >
          <DialogContent>
            {message}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogMessage} color="primary">
              いいえ
            </Button>
            <Button onClick={() => doYes()} color="primary">
              はい
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}
export default CommonDialog