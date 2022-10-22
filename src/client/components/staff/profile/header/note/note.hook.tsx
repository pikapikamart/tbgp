import { useExpansion } from "@/lib/hooks"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { BaseModal } from "@/components/shared/modal"
import { RequestPositionModal } from "@/components/collections/modals/staff/requestPosition"


export const useHeaderProfileVerify = () =>{
  const staff = useSelectStaff()
  const modalContext = useModalContext()
  const { isExpanded, handleExpansion } = useExpansion()

  const handleVerification = () =>{
    handleExpansion()
    modalContext.addModal(
      <BaseModal exit={ handleExpansion }>
        <RequestPositionModal />
      </BaseModal>
    )
  }

  return {
    staff,
    isExpanded,
    modalContext,
    handleVerification
  }
}