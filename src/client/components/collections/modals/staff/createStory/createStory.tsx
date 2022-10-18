import { CreateStoryForm } from "@/components/collections/forms/createStory"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"


const CreateStory = () =>{

  return (
    <ModalWrapper
      size="medium"
      padding="medium">
        <ModalHeading
          id="modal-heading"
          size="medium"
          align="left">Story Request
        </ModalHeading>
        <CreateStoryForm />
    </ModalWrapper>
  )
}


export default CreateStory