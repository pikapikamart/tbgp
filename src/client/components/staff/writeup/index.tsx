import { ModalProvider } from "@/store/context/modal"
import Writeup from "./writeup"


export const StaffWriteup = () =>{

  return (
    <ModalProvider>
      <Writeup />
    </ModalProvider>
  )
}