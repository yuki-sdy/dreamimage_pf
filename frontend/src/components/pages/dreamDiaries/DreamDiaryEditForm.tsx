import React, { useEffect, useState, useContext } from "react"
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import CircularProgress from '@material-ui/core/CircularProgress'
import AlertMessage from "../../utils/AlertMessage"

import { DreamDiaryFormData } from "../../../interfaces"
import { DreamDiaryPreview, getDreamDiary, ImageCreate } from "../../../lib/api/dreamdiaries"
import { useNavigate, useParams } from "react-router-dom"
import { dream_types, impressions } from "../../../data/dreamdiaryEnums"
import DateFnsUtils from "@date-io/date-fns"
import CancelIcon from "@material-ui/icons/Cancel"
import { AuthContext } from "../../../App"
import { Alert } from "@material-ui/lab"

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 800
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

const DreamDiaryEditForm: React.FC = () => {
  const classes = useStyles()
  const navigation = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const params = useParams()
  // const check = sampleLocation.pathname.split('/').pop()

  const [loading, setLoading] = useState<boolean>(true)
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [formLoading, setFormLoading] = useState<boolean>(false)
  
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
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleDreamDiary = async () => {
    try {
      const res = await getDreamDiary(Number(params.id))
      console.log(res)

      if (currentUser?.id !== res.data.userId) {
        navigation('/dreamdiaries')
      }

      if (res.status === 200) {
        // setDreamDiary(res.data.dreamDiary)
        setTitle(String(res.data.title))
        setBody(String(res.data.body))
        setContent(String(res.data.content))
        setPrompt(String(res.data.prompt))
        setImpression(res.data.impression)
        setDreamType(res.data.dreamType)
        setState(Boolean(res.data.state))
        setDreamDate(res.data.dreamDate)
        setImage(res.data.image)

      } else {
        console.log("No diary")
      }
    } catch (err) {
      navigation("/notfound")
    }

    setLoading(false)
  }

  useEffect(() => {
    handleDreamDiary()
  }, [])

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormLoading(true)
    const data = createFormData()
    
    try {
      console.log(data)
      const res = await DreamDiaryPreview(data)

      if (res.status === 200) {
        navigation('/dreamdiaries/preview',
         { state: {dreamDiary: res.data.dreamDiary,
                  dreamDiaryId: params.id, 
                  diaryOgp: res.data.diaryOgp} })
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
    setFormLoading(false)
  }

  return (
    <>
    {
      !loading ? (
        <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="夢絵日記 編集" />
          <CardContent>
            <Alert severity="warning">
            1日当たりの絵の生成回数には制限があります。<br/>
            　・新規登録済みのユーザー：10回<br/>　・ゲストログインユーザー：5回<br/>
            　　※「画像生成回数」 = 「キーワードを入力して"絵を生成してみる"をクリックした回数」です。
            </Alert>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="タイトル(40字以内)"
              placeholder="40文字以内で書いてください。"
              inputProps={{ maxLength: 40 }}
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
              label="夢の内容(125字以内)"
              placeholder="125文字以内で書いてください。"
              inputProps={{ maxLength: 125 }}
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
              label="キーワード(約40字)"
              placeholder="40文字程度で書いてください。"
              type="prompt"
              value={prompt}
              margin="dense"
              autoComplete="current-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
            />
            <div style={{ textAlign: "right"}} >
            {
              imageLoading ? (
                <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={ true }
                className={classes.submitBtn}
              >
                <CircularProgress
                  size="1.5rem" />
              </Button>
              ):(
                <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!prompt ? true : false}
                className={classes.submitBtn}
                onClick={handlePromptsSubmit}
              >
                絵を生成してみる
                </Button>
              )
            }
            </div>
            { preview ? (
              <Box
              className={classes.box}
            >
              <IconButton
                color="inherit"
                onClick={() => setImage("")}
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
                  rows={2}
                  label="この日記に対するコメント(80字)"
                  placeholder="80文字以内で書いてください。"
                  inputProps={{ maxLength: 80 }}
                  value={content}
                  margin="dense"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                />
            </Box>
            ) : (
              image ? (
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
                    src={image}
                    alt="preview img"
                    className={classes.preview}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    label="この日記に対するコメント(80字)"
                    placeholder="80文字以内で書いてください。"
                    inputProps={{ maxLength: 80 }}
                    value={content}
                    margin="dense"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                  />
                </Box>
              ) : null
            )}
            <div style={{ textAlign: "center"}} >
            {
                formLoading ? (
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={ true }
                className={classes.submitBtn}
              >
                <CircularProgress
                  size="1.5rem" />
              </Button>
                ) : (
              <>
              <FormGroup>
              <FormControlLabel
                control={<Checkbox /> } 
                value={Boolean(state)}
                checked={Boolean(state)}
                onChange={(state: any) => setState(state => !state)} 
                label={"この日記を公開する"}
                style={{margin: "auto"}} />
              </FormGroup>
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
              </>
                )
              }
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
      ) : (<></>)
    }
    </>
  )
}

export default DreamDiaryEditForm