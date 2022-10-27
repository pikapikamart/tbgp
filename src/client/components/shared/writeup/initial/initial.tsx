import { InitialWriteup } from "@/src/server/controllers/writeup.controller"
import Link from "next/link"
import { 
  InitialWriteupWrapper,
  WriteupTitle,
  WriteupCaption
 } from "./initial.styled"


type InitialProps = {
  writeup: InitialWriteup,
}

const Initial = ({ writeup }: InitialProps) =>{

  return (
    <InitialWriteupWrapper>
      <WriteupTitle>
        <Link 
          href={ `/storybuilder/writeup/${ writeup.writeupId }` }>
          <a>{ writeup.content.title }</a>
        </Link>
      </WriteupTitle>
      <WriteupCaption>{ writeup.content.caption }</WriteupCaption>
    </InitialWriteupWrapper>
  )
}


export default Initial