import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { 
  NoteDetails,
  NoteListItem,
  NoteMessage,
  NotesHeading, 
  NoteSummary, 
  NotesWrapper } from "./notes.styled"
import DetailsSvg from "@/public/icons/icon-notes-summary.svg";


const Notes = () =>{
  const writeup = useSelectWriteup()

  const renderNotes = () =>{
    const notes = writeup.content[0].notes.map(note => (
      <NoteListItem key={ note.title }>
        <NoteDetails>
          <NoteSummary>
            { note.title }
            <DetailsSvg aria-hidden="true" />
          </NoteSummary>
          <NoteMessage>{ note.message }</NoteMessage>
        </NoteDetails>
      </NoteListItem>
    ))

    return notes
  }

  return(
    <NotesWrapper>
      <NotesHeading>Notes</NotesHeading>
      <ul>
        { renderNotes() }
      </ul>
    </NotesWrapper>
  )
}


export default Notes