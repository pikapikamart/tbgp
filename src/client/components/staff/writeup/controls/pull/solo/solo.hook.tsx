import { WriteupSoloSubmitModal } from "@/components/collections/modals/writeup/solo/submit"
import { BaseModal } from "@/components/shared/modal"
import { useModalContext } from "@/store/context/modal/modal"
import { useState } from "react"


export const useSolo = () =>{
  const modalContext = useModalContext()
  const [ submitModal, setSubmitModal ] = useState(false)

  const handleSubmissionModal = () =>{
    setSubmitModal(true)
    modalContext.addModal(
      <BaseModal exit={ () => setSubmitModal(false) }>
        <WriteupSoloSubmitModal exit={ () => setSubmitModal(false) } /> 
      </BaseModal>
    )
  }

  return {
    submitModal,
    handleSubmissionModal
  }
}