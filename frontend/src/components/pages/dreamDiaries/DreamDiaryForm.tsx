import React, { useState, useContext } from "react"
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import CircularProgress from '@material-ui/core/CircularProgress'
import AlertMessage from "../../utils/AlertMessage"

import { DreamDiaryFormData } from "../../../interfaces"
import { DreamDiaryPreview, ImageCreate } from "../../../lib/api/dreamdiaries"
import { useNavigate } from "react-router-dom"
import { dream_types, impressions } from "../../../data/dreamdiaryEnums"
import DateFnsUtils from "@date-io/date-fns"
import CancelIcon from "@material-ui/icons/Cancel"
import { AuthContext } from "../../../App"

import FormTitleImage from "../../../images/formtitle.png"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    width: "50%",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 800,
    margin: "auto"
  },
  inputFileButton: {
    textTransform: "none",
    color: theme.palette.primary.main
  },
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  box: {
    marginBottom: "1.5rem"
  },
  preview: {
    width: "50%"
  }
}))

const DreamDiaryForm: React.FC = () => {
  const classes = useStyles()
  const navigation = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [prompt, setPrompt] = useState<string>("")

  const [state, setState] = useState<boolean>(false)
  const [impression, setImpression] = useState<number>()
  const [dreamType, setDreamType] = useState<number>()
  const [dreamDate, setDreamDate] = useState<Date | null>(new Date("2023-01-01"))

  const [image, setImage] = useState<string>("")
  const [preview, setPreview] = useState<string>("")
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const createFormData = (): DreamDiaryFormData => {
    const formData = new FormData()

    formData.append("title", title)
    formData.append("body", body)
    formData.append("content", content)
    formData.append("state", String(state))
    formData.append("impression", String(impression))
    formData.append("dreamType", String(dreamType))
    formData.append("dreamDate", String(dreamDate))
    formData.append("prompt", prompt)
    formData.append("image", image)
    formData.append("userId", String(currentUser?.id))

    return formData
  }

  // 画像生成する
  const handlePromptsSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setImageLoading(true)

    try {
      const res = await ImageCreate(prompt, currentUser?.id)
      console.log(res)

      if (res.status === 200) {
        setPreview(res.data.image)
        setImage(res.data.image)

      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
    setImageLoading(false)
  }

  //フォームを送信する
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = createFormData()
    
    try {
      console.log(data)
      const res = await DreamDiaryPreview(data)
      console.log(res)

      if (res.status === 200) {
        navigation('/dreamdiaries/preview',
         { state: {dreamDiary: res.data.dreamDiary, diaryOgp: res.data.diaryOgp} })

      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <div style={{textAlign: "center"}}>
          <img src={ FormTitleImage } className={classes.header} />
        </div>
        <Card className={classes.card}>
          <CardContent>
            <FormGroup style={{ float: "right"}}>
              <FormControlLabel
                control={<Checkbox /> } 
                value={Boolean(state)}
                checked={Boolean(state)}
                onChange={(state: any) => setState(state => !state)} 
                label={Boolean(state) === true ? "公開中" : "公開する"} />
            </FormGroup>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="タイトル(40字)"
              placeholder="40文字以内で書いてください。"
              value={title}
              margin="dense"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              label="夢の内容(125字)"
              placeholder="125文字以内で書いてください。"
              value={body}
              margin="dense"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
            />
            <FormControl
              variant="outlined"
              margin="dense"
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">夢の印象</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={impression}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setImpression(e.target.value as number)}
                label="夢の印象"
              >
                {
                  impressions.map((impression: string, index: number) => 
                    <MenuItem value={index}>{impression}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              margin="dense"
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">睡眠の種類</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={dreamType}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setDreamType(e.target.value as number)}
                label="睡眠の種類"
              >
                {
                  dream_types.map((dreamType: string, index: number) => 
                    <MenuItem value={index}>{dreamType}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  fullWidth
                  inputVariant="outlined"
                  margin="dense"
                  id="date-picker-dialog"
                  label="夢を見た日"
                  format="MM/dd/yyyy"
                  value={dreamDate}
                  onChange={(date: Date | null) => {
                    setDreamDate(date)
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="呪文(40字)"
              placeholder="40文字以内で書いてください。"
              type="prompt"
              value={prompt}
              margin="dense"
              autoComplete="current-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
            />
            <div style={{ textAlign: "right"}} >
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!prompt ? true : false}
                className={classes.submitBtn}
                onClick={handlePromptsSubmit}
              >
                {
                  imageLoading ? (
                    <CircularProgress
                      size="1.5rem" />
                  ):(
                    "絵を生成してみる"
                  )
                }
              </Button>
            </div>
            {
              preview ? (
                <Box
                  className={classes.box}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => setPreview("")}
                  >
                    <CancelIcon />
                  </IconButton>
                  <img
                    src={preview}
                    alt="preview img"
                    className={classes.preview}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    label="この日記に対するコメントをください！(125字)"
                    placeholder="125文字以内で書いてください。"
                    value={content}
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                  />
                </Box>
              ) : null
            }
            <div style={{ textAlign: "center"}} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!title || !body || !prompt ? true : false}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                内容を確認する
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="記入内容を確かめてください。"
      />
    </>
  )
}

export default DreamDiaryForm