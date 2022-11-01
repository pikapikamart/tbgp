import { useState } from "react"
import { useModalContext } from "@/store/context/modal/modal"
import { BaseModal } from "@/components/shared/modal"
import { WriteupSubmitCollaborativeModal } from "@/components/collections/modals/writeup/submit/collaborative"


export const useCollaborative = () =>{
  const modalContext = useModalContext()
  const [ cancelModal, setCancelModal ] = useState(false)
  const [ submitModal, setSubmitModal ] = useState(false)

  const handleSubmissionModal = () =>{
    setSubmitModal(true)
    modalContext.addModal(
      <BaseModal exit={ () => setSubmitModal(false) }>
        <WriteupSubmitCollaborativeModal exit={ () => setSubmitModal(false) } />
      </BaseModal>
    )
  }

  const handleCancelSubmissionModal = () =>{
    
  }

  return {
    handleSubmissionModal,
    handleCancelSubmissionModal,
    cancelModal,
    submitModal
  }
}