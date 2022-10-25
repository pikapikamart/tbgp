import { RequestNoteWrapper } from "../storyRequest.styled"
import { Note as NoteComp } from "@/components/shared/note"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { useTrackedStoryRequest } from "../storyRequest.tracked"


const Note = () =>{
  const { 
    storyRequest,
    hasRequested,
    isOwned,
    isMember } = useTrackedStoryRequest()
    
  if ( isOwned && storyRequest?.members.length===0 ) {
    return (
      <RequestNoteWrapper >
        <NoteComp text="Story request can be started when there is atleast 1 member joined." />
      </RequestNoteWrapper>
    )
  }

  return (
    <>
      { hasRequested && (
        <RequestNoteWrapper >
          <NoteComp text="Request already sent. This note will be removed if your request has been denied or it will change if you are accepted." />
        </RequestNoteWrapper>
      ) }
      { isMember && (
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