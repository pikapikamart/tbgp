import { RequestNoteWrapper } from "../storyRequest.styled"
import { getStoryRequestInformation } from "../utils"
import { Note as NoteComp } from "@/components/shared/note"


type NoteProps = {
  hasApplied: boolean,
  request: ReturnType<typeof getStoryRequestInformation>
}

const Note = ({ hasApplied, request }: NoteProps) =>{
  const { 
    storyRequest,
    hasRequested,
    isMember } = request

  return (
    <>
      { hasRequested!==-1 || hasApplied && (
        <RequestNoteWrapper >
          <NoteComp text="Request already sent. This note will be removed if your request has been denied or it will change if you are accepted." />
        </RequestNoteWrapper>
      ) }
      { isMember!==-1 && (
        <RequestNoteWrapper>
          <NoteComp
            colored="blue" 
            text="Request has been successfully accepted. Wait for the owner to start the story request." />
        </RequestNoteWrapper>
      ) }
    </>
  )
}


export default Note