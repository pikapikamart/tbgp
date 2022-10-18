import { useModalContext } from "@/store/context/modal/modal"
import { useEffect } from "react"
import { useFocusModal } from "./modal.hooks"
import { 
  BaseModalWrapper, 
  ModalDocument, 
  ModalExit } from "./modal.styled"


type ModalProps = {
  children: React.ReactNode,
  exit?: () => void
}

const Modal = ({ children, exit }: ModalProps) => {
  const { modalRef } = useFocusModal()
  const modalContext = useModalContext()

  useEffect(() =>{
    document.body.classList.add("no-scroll")

    return () => document.body.classList.remove("no-scroll")
  }, [])

  return (
    <BaseModalWrapper
      role="dialog"
      tabIndex={ -1 }
      ref={ modalRef }
      aria-labelledby="modal-heading">
      <ModalDocument role="document">
        <ModalExit onClick={ () => {
          modalContext.removeModal()
          exit? exit() : null
        } } />
        { children }
      </ModalDocument>
    </BaseModalWrapper>
  )
}


export default Modal;