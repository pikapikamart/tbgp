import { useFocusRef } from "@/lib/hooks"
import { BaseModalWrapper } from "./modal.styled"


type ModalProps = {
  children: React.ReactNode
}

const Modal = ( { children }: ModalProps ) => {
  const { elementRef } = useFocusRef()

  return (
    <BaseModalWrapper
      role="dialog"
      tabIndex={ -1 }
      ref={ elementRef }
      aria-labelledby="modal-heading">
      <div role="document">
        { children }
      </div>
    </BaseModalWrapper>
  )
}


export default Modal;