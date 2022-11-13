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
  paddingStyle?: string,
  exit?: () => void
}

const Modal = ({ children, isChild, styleReset, paddingStyle, exit }: ModalProps) => {
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
      key="base-modal-wrapper"
      role="dialog"
      tabIndex={ -1 }
      ref={ modalRef }
      stylereset={ styleReset }
      paddingstyle={ paddingStyle }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-labelledby="modal-heading">
      <ModalDocument role="document">
        <ModalExit onClick={ handleExitModal } />
        { children }
      </ModalDocument>
    </BaseModalWrapper>
  )
}


export default Modal;