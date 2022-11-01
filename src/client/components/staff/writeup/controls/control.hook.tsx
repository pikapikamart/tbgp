import { WriteupVersionModal } from "@/components/collections/modals/writeup/version"
import { BaseModal } from "@/components/shared/modal"
import { useExpansion } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { useRouter } from "next/router"
import { useEffect } from "react"


export const useWriteupControl = () =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const {
    isExpanded: requestIsExpanded,
    handleExpansion: handleRequestExpansion
  } = useExpansion()
  const modalContext = useModalContext()
  const router = useRouter()

  const handleAddModal = () =>{
    handleRequestExpansion()
    modalContext.addModal(
      <BaseModal
        exit={ handleRequestExpansion }
        styleReset={ true }>
          <WriteupVersionModal />
      </BaseModal>
    )
  }

  useEffect(() =>{
    modalContext.removeModal()
    handleExpansion()
  }, [ router.query["phase"] ])

  return{
    isExpanded,
    handleExpansion,
    requestIsExpanded,
    handleAddModal
  }
}