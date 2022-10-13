import { useModalContext } from "@/store/context/modal/modal"
import { useFocusModal } from "./modal.hooks"
import { 
  BaseModalWrapper, 
  ModalExit } from "./modal.styled"


type ModalProps = {
  children: React.ReactNode
}

const Modal = ({ children }: ModalProps) => {
  const { modalRef } = useFocusModal()
  const modalContext = useModalContext()

  return (
    <BaseModalWrapper
      role="dialog"
      tabIndex={ -1 }
      ref={ modalRef }
      aria-labelledby="modal-heading">
      <div role="document">
        <ModalExit onClick={ modalContext.removeModal } />
        { children }
      </div>
    </BaseModalWrapper>
  )
}


export default Modal;