import { WriteupSoloSubmitModal } from "@/components/collections/modals/writeup/solo/submit"
import { TakeTaskModal } from "@/components/collections/modals/writeup/task"
import { PublishWriteupModal } from "@/components/collections/modals/writeup/task/publish"
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
  const [ submitModal, setSubmitModal ] = useState(false)
  const [ publishModal, setPublishModal ] = useState(false)

  const handleTakeTaskModal = () =>{
    setTakeTaskModal(true)
    modalContext.addModal(
      <BaseModal exit={ () => setTakeTaskModal(false) }>
        <TakeTaskModal exit={ () => setTakeTaskModal(false) } />
      </BaseModal>
    )
  }

  const handleSubmissionModal = () => {
    setSubmitModal(true)
    modalContext.addModal(
      <BaseModal exit={ () => setSubmitModal(false) }>
        <WriteupSoloSubmitModal exit={ ()=> setSubmitModal(false) }/>
      </BaseModal>
    )
  }

  const handlePublishModal = () =>{
    setPublishModal(true)
    modalContext.addModal(
      <BaseModal exit={ () => setSubmitModal(false) }>
        <PublishWriteupModal exit={ () => setPublishModal(false) } />
      </BaseModal>
    )
  }

  return {
    staff,
    writeup,
    takeTaskModal,
    handleTakeTaskModal,
    submitModal,
    handleSubmissionModal,
    handlePublishModal,
    publishModal
  }
}