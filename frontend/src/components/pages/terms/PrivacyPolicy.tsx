import { Box, Card, CardContent, CardHeader, makeStyles, Theme, Typography } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: "center"
  },
  card: {
    width: "100%"
  },
  box: {
    paddingTop: "2rem"
  },
  title: {
    fontWeight: "bold",
    marginTop: "1.5rem"
  },
}))

const PrivacyPolicy: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="プライバシーポリシー" />
        <CardContent>
          <Box className={classes.box}>
            <Typography variant="body2">
              本ウェブサイトの管理者（以下，「管理者」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，お客様の個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              お客様から取得する情報
            </Typography>
            <Typography variant="body2">
              　・氏名（ニックネームやペンネーム含む）<br/>
              　・メールアドレス<br/>
              　・外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報<br/>
              　・Cookie（クッキー）を用いて生成された識別情報<br/>
              　・本ウェブサイトの滞在時間、入力履歴等の本ウェブサイトにおけるお客様の行動履歴<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              個人情報の利用目的
            </Typography>
            <Typography variant="body2">
              本サービスは、お客様から取得した情報を利用する目的は以下のとおりです。<br/>
              　・本サービスに関する登録の受付、お客様の本人確認、認証のため<br/>
              　・お客様の本サービスの利用履歴を管理するため<br/>
              　・本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため<br/>
              　・お客様からのお問い合わせに対応するため<br/>
              　・本サービスの利用規約や法令に違反する行為に対応するため<br/>
              　・本サービスの変更、提供中止、終了、契約解除を連絡するため<br/>
              　・本サービス規約の変更等を通知するため<br/>
              　・以上の他、管理者サービスの提供、維持、保護及び改善のため<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第三者提供
            </Typography>
            <Typography variant="body2">
              お客様からお預かりした個人情報を、個人情報保護法その他の法令に基づき開示が認められる場合を除き、お客様ご本人の同意を得ずに第三者に提供することはありません。
            </Typography>
            <Typography variant="body2" className={classes.title}>
              アクセス解析ツールについて
            </Typography>
            <Typography variant="body2">
              当サイトは、Googleが提供するアクセス解析ツール「Googleアナリティクス」を利用しています。Googleアナリティクスは、Cookieを使用することでお客様のトラフィックデータを収集しています。お客様はブラウザの設定でCookieを無効にすることで、トラフィックデータの収集を拒否することができます。詳しくはGoogle アナリティクス利用規約をご確認ください。
            </Typography>
            <Typography variant="body2" className={classes.title}>
              プライバシーポリシーの変更
            </Typography>
            <Typography variant="body2">
              プライバシーポリシーの内容を適宜見直し、その改善に努めます。<br/>
              内容の変更は、当サイトに掲載された時点で有効になるものとします。
            </Typography>
            <Typography variant="body2" className={classes.title}>
              お問合せ
            </Typography>
            <Typography variant="body2">
              お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、お問合せフォームよりご連絡ください。
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default PrivacyPolicy