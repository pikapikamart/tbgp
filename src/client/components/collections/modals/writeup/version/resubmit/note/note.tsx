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

  const calcHeight = (value: string) => {
    const numberOfLineBreaks = (value.match(/\n/g) || []).length;
    const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  }

  const handleTextareaResize = ( event: React.KeyboardEvent<HTMLTextAreaElement> ) => {
    const element = event.currentTarget
    element.style.height = calcHeight(element.value) + "px"
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
        onKeyUp={ handleTextareaResize }
        onBlur={ handleMessageValue } />
      <RemoveNote onClick={ handleRemoveNote }>Remove</RemoveNote>
    </NoteContainer>
  )
}


export default Note