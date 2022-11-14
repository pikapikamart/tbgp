import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  AddNote,
  Notes,
  NotesHeading,
  ResubmitContainer, 
  ResubmitControls, 
  ResubmitSendBack, 
  ResubmitTrigger } from "./resubmit.styled"
import { ResubmitNote } from "./note"
import { SrOnly } from "@/styled/shared/helpers"
import CrossSvg from "@/public/icons/icon-add-large.svg";
import { useResubmit } from "./resubmit.hook"
import { ToastError } from "@/components/shared/toast/error";


const Resubmit = () => {
  const {
    isExpanded,
    handleExpansion,
    notes,
    setNotes,
    handleAddExtraNote,
    handleResubmit,
    isError
  } = useResubmit()
  
  return (
    <ResubmitContainer>
      { isError && <ToastError 
        code="Error"
        message="Make sure to fill up all notes field or remove it" /> }
      <ResubmitTrigger
        colored="red"
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>Request re-submit</ResubmitTrigger>
      <Notes>
        <NotesHeading>Add notes</NotesHeading>
        { notes.map((note, index) => (
          <ResubmitNote 
            key={ index }
            note={ note }
            setNotes={ setNotes }
            index={ index } />
        )) }
        <AddNote
          onClick={ handleAddExtraNote }>
          <CrossSvg aria-hidden="true" />
          <SrOnly>Add note</SrOnly>
        </AddNote>
      </Notes>
      <ResubmitControls>
        <ResubmitSendBack
          colored="red"
          onClick={ handleResubmit }>Send back
        </ResubmitSendBack>
        <ColoredMediumButton
          colored="grey"
          onClick={ handleExpansion }>Cancel
        </ColoredMediumButton>
      </ResubmitControls>
    </ResubmitContainer>
  )
}


export default Resubmit