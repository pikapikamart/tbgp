import { WriteupSoloSubmitModal } from "@/components/collections/modals/writeup/solo/submit"
import { TakeTaskModal } from "@/components/collections/modals/writeup/task"
import { PublishWriteupModal } from "@/components/collections/modals/writeup/task/publish"
import { BaseModal } from "@/components/shared/modal"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { WriteupState } from "@/store/slices/writeup.slice"
import { 
  useEffect, 
  useState } from "react"


export const notValidGraphicsBanner = ( writeup: WriteupState ) => {
  return writeup.currentPhase==="graphics" && writeup.banner.url===""
}

export const useTask = () =>{
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  const modalContext = useModalContext()
  const [ takeTaskModal, setTakeTaskModal ] = useState(false)
  const [ submitModal, setSubmitModal ] = useState(false)
  const [ publishModal, setPublishModal ] = useState(false)
  const [ savedImage, setSavedImage ] = useState(false)

  const handleTakeTaskModal = () =>{
    setTakeTaskModal(true)
    modalContext.addModal(
      <BaseModal exit={ () => setTakeTaskModal(false) }>
        <TakeTaskModal exit={ () => setTakeTaskModal(false) } />
      </BaseModal>
    )
  }

  const handleSubmissionModal = () => {
    if ( writeup.currentPhase==="graphics" && !savedImage ) {
      return
    }

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

  useEffect(() =>{
    if ( writeup.shouldSave && writeup.banner.url!=="" ) {
      setSavedImage(true)
    }
  }, [ writeup.shouldSave ])

  return {
    staff,
    writeup,
    takeTaskModal,
    handleTakeTaskModal,
    submitModal,
    handleSubmissionModal,
    handlePublishModal,
    publishModal,
    savedImage
  }
}