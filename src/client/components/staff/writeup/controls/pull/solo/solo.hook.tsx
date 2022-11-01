import { WriteupSoloSubmitModal } from "@/components/collections/modals/writeup/solo/submit"
import { BaseModal } from "@/components/shared/modal"
import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { resetSubmission } from "@/store/slices/writeup.slice"
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