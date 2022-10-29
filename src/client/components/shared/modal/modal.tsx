import { useModalContext } from "@/store/context/modal/modal"
import { useFocusModal } from "./modal.hooks"
import { 
  BaseModalWrapper, 
  ModalDocument, 
  ModalExit } from "./modal.styled"


type ModalProps = {
  children: React.ReactNode,
  isChild?: boolean,
  styleReset?: boolean,
  exit?: () => void
}

const Modal = ({ children, isChild, styleReset, exit }: ModalProps) => {
  const { modalRef } = useFocusModal()
  const modalContext = useModalContext()

  const handleExitModal = () =>{
    exit? exit() : null

    if ( !isChild ) {
      modalContext.removeModal()
    }
  }

  return (
    <BaseModalWrapper
      role="dialog"
      tabIndex={ -1 }
      ref={ modalRef }
      styleReset={ styleReset }
      aria-labelledby="modal-heading">
      <ModalDocument role="document">
        <ModalExit onClick={ handleExitModal } />
        { children }
      </ModalDocument>
    </BaseModalWrapper>
  )
}


export default Modal;