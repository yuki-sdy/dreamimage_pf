import { Box, Card, CardContent, CardHeader, makeStyles, Theme, Typography, Button } from "@material-ui/core"
import React from "react"
import { Link,  } from "react-router-dom"

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
  button: {
    padding: "0",
    "&:hover": {
      backgroundColor: "white",
      textDecoration: "underline"
    }
  }
}))

const TermOfService: React.FC = () => {
  const classes = useStyles()

  const handleLink1 = () => {
    window.open("https://rinna.co.jp/tsukuru-terms-of-use/", '_blank')    
  }

  const handleLink2 = () => {
    window.open("https://huggingface.co/CompVis/stable-diffusion", '_blank')    
  }

  return (
    <>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="利用規約" />
        <CardContent>
          <Box className={classes.box}>
            <Typography variant="body2">
            この利用規約（以下、「本規約」といいます。）は、本ウェブサイトの管理者（以下、「管理者」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第1条（適用）
            </Typography>
            <Typography variant="body2">
            　1. 本規約は、ユーザーと管理者との間の本サービスの利用に関わる一切の関係に適用されるものとします。<br/>
            　2. 管理者は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。<br/>
            　3. 本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第2条（本サービスの内容）
            </Typography>
            <Typography variant="body2">
              本アプリは、アプリ上でテキストデータを送信して生成されたイメージ画像を利用した日記の作成と共有ができるサービスです。<br/>
              一日の利用可能回数には本アプリの定める上限があり、上限回数は予告なく変更されることがあります。<br/>
              <br/>
              本アプリでは、Japanese Stable Diffusionを利用して画像生成を行なっています。
              <br/>
              生成された画像データの著作権に関しては、
              <Button
                onClick={handleLink1}
                className={classes.button}>
                Japanese Stable Diffusion
              </Button>
              および、
              <Button
                onClick={handleLink2}
                className={classes.button}>
                Stable Diffusion
              </Button>
              の規約に従います。<br/>
              本アプリによって利用者が送信するテキストデータから画像への変換については、管理者の意思に基づき利用、加工、複製、翻案等を行うものではなく、本アプリのAI機能によって専ら機械的に行われるに過ぎません。したがって、当該テキストまたは画像の著作権、商標権、肖像権その他の知的財産権その他の権利の保護について、当社は、いかなる関与又は保証を行うものではありません。このため、利用者は、自己責任に基づき、本アプリを利用するものとし、本アプリの利用の結果、第三者の権利侵害が発生した場合においても、利用者自らの責任と費用によって解決するものとし、管理者はいかなる責任も負わないものとします。
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第3条（禁止事項）
            </Typography>
            <Typography variant="body2">
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。<br/>
              　1. 法令または公序良俗に違反する行為<br/>
              　2. 犯罪行為に関連する行為<br/>
              　3. 本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為<br/>
              　4. 管理者、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為<br/>
              　5. 本サービスによって得られた情報を商業的に利用する行為<br/>
              　6. 管理者のサービスの運営を妨害するおそれのある行為<br/>
              　7. 不正アクセスをし、またはこれを試みる行為<br/>
              　8. 他のユーザーに関する個人情報等を収集または蓄積する行為<br/>
              　9. 不正な目的を持って本サービスを利用する行為<br/>
              　10. 本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為<br/>
              　11. 他のユーザーに成りすます行為<br/>
              　12. 管理者が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為<br/>
              　13. 面識のない異性との出会いを目的とした行為<br/>
              　14. 管理者のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為<br/>
              　15.その他、管理者が不適切と判断する行為<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第4条（本サービスの提供の停止等）
            </Typography>
            <Typography variant="body2">
              1. 管理者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。<br/>
              　・本サービスにかかるコンピュータシステムの保守点検または更新を行う場合<br/>
              　・地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合<br/>
              　・コンピュータまたは通信回線等が事故により停止した場合<br/>
              　・その他、管理者が本サービスの提供が困難と判断した場合<br/>
              2. 管理者は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第5条（保証の否認および免責事項）
            </Typography>
            <Typography variant="body2">
              　1. 管理者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。<br/>
              　2. 管理者は、本サービスに起因してユーザーに生じたあらゆる損害について、管理者の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する管理者とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。<br/>
              　3. 前項ただし書に定める場合であっても、管理者は、管理者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（管理者またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、管理者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。<br/>
              　4. 管理者は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第6条（サービス内容の変更等）
            </Typography>
            <Typography variant="body2">
              管理者は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第7条（利用規約の変更）
            </Typography>
            <Typography variant="body2">
              管理者は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。<br/>
              　1. 本規約の変更がユーザーの一般の利益に適合するとき。<br/>
              　2. 本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。<br/>
              管理者はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第8条（個人情報の取扱い）
            </Typography>
            <Typography variant="body2">
              管理者は、本サービスの利用によって取得する個人情報については、本サービス「プライバシーポリシー」に従い適切に取り扱うものとします。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第9条（権利義務の譲渡の禁止）
            </Typography>
            <Typography variant="body2">
              ユーザーは、管理者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。<br/>
            </Typography>
            <Typography variant="body2" className={classes.title}>
              第10条（準拠法・裁判管轄）
            </Typography>
            <Typography variant="body2">
              　1. 本規約の解釈にあたっては、日本法を準拠法とします。<br/>
              　2. 本サービスに関して紛争が生じた場合には、管理者の所在地を管轄する裁判所を専属的合意管轄とします。<br/>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default TermOfService