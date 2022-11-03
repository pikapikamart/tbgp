import { BaseModal } from "@/components/shared/modal"
import { useExpansion } from "@/lib/hooks"
import { 
  useAppDispatch,
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { WriteupBanner } from "@/store/reducers/writeup.reducer"
import { addWriteupBanner } from "@/store/slices/writeup.slice"
import { useState } from "react"
import { isWriteupHandler } from "../../../utils"
import { AddImageModal } from "../../image"


export const useCover = () =>{
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const { isExpanded, handleExpansion } = useExpansion()
  const [ cover, setCover ] = useState<WriteupBanner>({
    url: writeup.banner.url,
    caption: writeup.banner.caption
  })
  const modalContext = useModalContext()
  const dispatch = useAppDispatch()

  const extractImageData = ( url: string, caption: string ) => {
    setCover({
      url,
      caption
    })
    dispatch(addWriteupBanner({
      url,
      caption
    }))
    modalContext.removeModal()
    handleExpansion()
  }

  const handleAddModal = () =>{

    if ( writeup.currentPhase!=="graphics" && isWriteupHandler(writeup, staff.bastionId) ) {
      return
    }

    handleExpansion()
    modalContext.addModal(
      <BaseModal exit={ handleExpansion }>
        <AddImageModal
          extractData={ extractImageData }
          exit={ () => {
            modalContext.removeModal()
            handleExpansion()
          } } />
      </BaseModal>
    )
  }

  return {
    cover,
    handleAddModal,
    writeup,
    staff,
    isExpanded,
  }
}