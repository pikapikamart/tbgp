import { simpleFadeVariant } from "@/src/client/motion"
import { useModalContext } from "@/store/context/modal/modal"
import { Variants } from "framer-motion"
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
  exit?: () => void,
  variants?: Variants
}

const Modal = ({ children, isChild, styleReset, paddingStyle, exit, variants }: ModalProps) => {
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
      variants={ variants?? simpleFadeVariant }
      initial="initial"
      animate="animate"
      exit="exit"
      aria-labelledby="modal-heading">
      <ModalDocument role="document">
        <ModalExit onClick={ handleExitModal } />
        { children }
      </ModalDocument>
    </BaseModalWrapper>
  )
}


export default Modal;