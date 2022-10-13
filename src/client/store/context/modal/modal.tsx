import { createContext, useContext, useRef, useState } from "react"


type Modal = React.ReactElement
type FocusBackElement = HTMLDivElement | null

export type ModalContextProps = {
  modal: Modal | null,
  focusBackElement: React.MutableRefObject<FocusBackElement>,
  addModal: ( modal: Modal ) => void,
  removeModal: () => void
}

export const ModalContext = createContext<ModalContextProps | null>(null)

type ModalProviderProps = {
  children: React.ReactNode
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [ modal, setModal ] = useState<Modal | null>(null)
  const focusBackElementRef = useRef<FocusBackElement>(null)

  const addModal = ( modalProp: Modal ) =>{
    setModal(modalProp)
  }

  const removeModal = () =>{
    setModal(null)
    focusBackElementRef.current?.focus()
  }

  return (
    <ModalContext.Provider 
      value={
        {
          modal,
          focusBackElement: focusBackElementRef,
          addModal,
          removeModal
        }
      }>
      { children }
      { modal && modal }
    </ModalContext.Provider>
  )
}

export const useModalContext = () =>{
  const modalContext = useContext(ModalContext) as ModalContextProps

  return modalContext
}

export default ModalProvider