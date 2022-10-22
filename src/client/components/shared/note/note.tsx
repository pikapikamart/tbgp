import { NoteText, NoteWrapper } from "./note.styled"


type NoteProps = {
  text: string,
  colored?: string,
  children?: React.ReactNode
}

const Note = ({ text, colored, children }: NoteProps) =>{

  return (
    <NoteWrapper colored={ colored }>
      <NoteText margined={ children!==undefined }>
        { text }
      </NoteText>
      { children }
    </NoteWrapper>
  )
}


export default Note