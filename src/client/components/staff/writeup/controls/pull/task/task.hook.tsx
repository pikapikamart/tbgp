import { TakeTaskModal } from "@/components/collections/modals/writeup/task"
import { BaseModal } from "@/components/shared/modal"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { useState } from "react"


export const useTask = () =>{
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  const modalContext = useModalContext()
  const [ takeTaskModal, setTakeTaskModal ] = useState(false)

  const handleTakeTaskModal = () =>{
    setTakeTaskModal(true)
    modalContext.addModal(
      <BaseModal exit={ () => setTakeTaskModal(false) }>
        <TakeTaskModal exit={ () => setTakeTaskModal(false) } />
      </BaseModal>
    )
  }

  return {
    staff,
    writeup,
    takeTaskModal,
    handleTakeTaskModal
  }
}