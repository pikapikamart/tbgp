import { NoteText, NoteWrapper } from "./note.styled"


type NoteProps = {
  text: string,
  children?: React.ReactNode
}

const Note = ({ text, children }: NoteProps) =>{

  return (
    <NoteWrapper>
      <NoteText margined={ children!==undefined }>
        { text }
      </NoteText>
      { children }
    </NoteWrapper>
  )
}


export default Note