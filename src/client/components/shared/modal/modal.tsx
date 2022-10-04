import { BaseModalWrapper } from "./modal.styled"


type ModalProps = {
  children: React.ReactNode
}

const Modal = ( { children }: ModalProps ) => {

  return (
    <BaseModalWrapper
      role="dialog"
      tabIndex={ -1 }
      aria-labelledby="modal-heading">
      <div role="document">
        { children }
      </div>
    </BaseModalWrapper>
  )
}


export default Modal;