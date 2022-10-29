import { isPopulatedInitialWriteup } from "@/store/slices/staff.slice"
import { 
  InitialWriteup, 
  PopulatedInitialWriteup } from "@/store/store.types"
import Link from "next/link"
import { Category } from "../../storyRequest/initial/initial.styled"
import { 
  InitialWriteupWrapper,
  WriteupTitle,
  WriteupCaption,
  WriteupStatusContainer
 } from "./initial.styled"


type InitialProps = {
  writeup: InitialWriteup | PopulatedInitialWriteup,
}

const Initial = ({ writeup }: InitialProps) =>{

  const returnStatus = () =>{

    if ( !isPopulatedInitialWriteup(writeup) ) {
      return <></>
    }

    const content = writeup.content

    if ( content.requestedResubmit ) {
      return <Category colored="red">re-submit requested</Category>
    }

    if ( content.reSubmit ) {
      return <Category colored="red">re-submit needed</Category>
    }

    if ( content.isAccepted ) {
      return <Category colored="skyBlue">accepted</Category>
    }

    if ( content.isSubmitted ) {
      return <Category colored="skyBlue">submitted</Category>
    }

    return <Category colored="green">ongoing</Category>
  }

  return (
    <InitialWriteupWrapper>
      <WriteupTitle>
        <Link 
          href={ `/storybuilder/writeup/${ writeup.writeupId }/${ writeup.content.phase }` }>
          <a>{ writeup.content.title }</a>
        </Link>
      </WriteupTitle>
      <WriteupCaption>{ writeup.content.caption }</WriteupCaption>
      { isPopulatedInitialWriteup(writeup) && (
        <WriteupStatusContainer>
          { writeup.content.phase!=="writeup" && (
            <Category colored="blue">{ writeup.content.phase.split(/(?=[A-Z])/).map(word => word.toLowerCase()).join(" ") }</Category>
          ) }
          { returnStatus() }
        </WriteupStatusContainer>
      ) }
    </InitialWriteupWrapper>
  )
}


export default Initial