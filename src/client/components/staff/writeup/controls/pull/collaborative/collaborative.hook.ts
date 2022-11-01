import { useModalContext } from "@/store/context/modal/modal"


export const useCollaborative = () =>{
  const modalContext = useModalContext()

  const handleSubmissionModal = () =>{

  }

  const handleCancelSubmissionModal = () =>{

  }

  return {
    handleSubmissionModal,
    handleCancelSubmissionModal
  }
}