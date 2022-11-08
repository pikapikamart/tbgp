import { WriteupNote } from "@/src/server/models/writeup.model"
import { 
  NoteContainer, 
  NoteMessageText, 
  NoteTitleInput, 
  RemoveNote} from "../resubmit.styled"


type NoteProps = {
  note: WriteupNote,
  setNotes: React.Dispatch<React.SetStateAction<WriteupNote[]>>
  index: number
}

const Note = ({ note, setNotes, index }: NoteProps) => {

  const handleTextareaResize = ( { currentTarget }: React.KeyboardEvent<HTMLTextAreaElement> ) => {
    currentTarget.style.height = "0"
    currentTarget.style.height = currentTarget.scrollHeight + "px"
  }

  const handleTitleValue = ( event: React.FocusEvent<HTMLInputElement, Element> ) => {
    const { value } = event.currentTarget

    if ( !value || value===note.title ) {
      return
    }

    setNotes( prev => {
      const newNotes = Array.from(prev)
      newNotes[index].title = value
      
      return newNotes
    })
  }

  const handleMessageValue = ( event: React.FocusEvent<HTMLTextAreaElement, Element> ) => {
    const { value } = event.currentTarget

    if ( !value || value===note.message ) {
      return
    }

    setNotes( prev => {
      const newNotes = Array.from(prev)
      newNotes[index].message = value
      
      return newNotes
    })
  }

  const handleRemoveNote = () => {
    setNotes (prev => {
      const newNotes = prev.slice(0, index).concat(prev.slice(index+1))

      return newNotes
    })
  }

  return (
    <NoteContainer>
      <NoteTitleInput
        placeholder="Note title"
        onBlur={ handleTitleValue } />
      <NoteMessageText
        placeholder="Note message"
        onInput={ handleTextareaResize }
        onBlur={ handleMessageValue } />
      <RemoveNote onClick={ handleRemoveNote }>Remove</RemoveNote>
    </NoteContainer>
  )
}


export default Note