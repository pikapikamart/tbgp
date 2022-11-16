import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { EmptyFunction } from "@/store/context/modal/modal"
import { WriteupState } from "@/store/slices/writeup.slice"
import { notValidGraphicsBanner } from "../../task/task.hook"
import { SubmitWrapper } from "./submit.styled"


type SubmitProps = {
  onClick: EmptyFunction,
  isExpanded: boolean
}

const isInvalid = ( writeup: WriteupState ) => {
  const content = writeup.content[0]

  return !content.title || !content.caption || content.data.length===1 && !content.data[0].children[0].text
}

const Submit = ({ onClick, isExpanded }: SubmitProps) =>{
  const writeup = useSelectWriteup()
  
  return (
    <SubmitWrapper
      colored="blue"
      onClick={ isInvalid(writeup)? () => {} : onClick }
      aria-expanded={ isExpanded }
      aria-invalid={ isInvalid(writeup) || notValidGraphicsBanner(writeup) }>Submit
    </SubmitWrapper>
  )
}


export default Submit