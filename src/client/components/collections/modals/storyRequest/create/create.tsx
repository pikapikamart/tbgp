import { CreateStoryForm } from "@/components/collections/forms/createStory"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"


const CreateStory = () =>{

  return (
    <LocalizationProvider dateAdapter={ AdapterDayjs }>
      <ModalWrapper
        size="large"
        padding="medium">
          <ModalHeading
            size="medium"
            align="left">Story Request
          </ModalHeading>
          <CreateStoryForm />
      </ModalWrapper>
    </LocalizationProvider>
  )
}


export default CreateStory