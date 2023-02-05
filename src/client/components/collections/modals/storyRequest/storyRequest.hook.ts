import { 
  useAppDispatch, 
  useSelectStaff } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { 
  deleteStoryRequest, 
  isEditorStaffState, 
  isFullStaffState, 
  updateJoinedStoryRequests, 
  updatePendingRequest } from "@/store/slices/staff.slice"
import { StaffProfile } from "@/store/store.types"
import { 
  useEffect, 
  useState } from "react"
import { useStoryDispatch } from "./storyRequest.tracked"


export const useStoryRequest = ( storyRequestId: string ) =>{
  const dispatch = useStoryDispatch()
  const appDispatch = useAppDispatch()
  const staff = useSelectStaff()
  const modalContext = useModalContext()
  const query = trpc.useQuery(["storyRequest.get", { storyRequestId }], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) => {
      dispatch({
        type: "SET_STORYREQUEST",
        payload: {
          storyRequest: JSON.parse(JSON.stringify(data)),
          staff
        }
      })

      if ( isFullStaffState(staff) && 
        data.members.find(({ member }) => member.bastionId===staff.bastionId) &&
        !staff.storyRequests.joined.includes(data.storyRequestId)  ) {
          appDispatch(updateJoinedStoryRequests(data.storyRequestId))
      }

      if ( isEditorStaffState(staff)) {
        const foundStoryRequest = staff.storyRequests.created.find(request => request.storyRequestId===data.storyRequestId)
        
        if ( !foundStoryRequest ) {
          return
        }

        appDispatch(updatePendingRequest({
          storyRequestId: data.storyRequestId,
          requests: data.requests as unknown as StaffProfile[]
        }))
      }
    },
    onError: () =>{
      modalContext.removeModal()
    }
  })

  useEffect(() =>{
    query.refetch()
  }, [])
}

export const useDeleteStoryRequest = ( storyRequestId: string ) =>{
  const [ isDeleting, setIsDeleting ] = useState(false)
  const dispatch = useAppDispatch()
  const modalContext = useModalContext()
  const mutation = trpc.useMutation(["storyRequest.delete"], {
    onSuccess: () =>{
      dispatch(deleteStoryRequest(storyRequestId))
      modalContext.removeModal()
    }
  })

  const handleDeleteStoryRequest = () =>{
    setIsDeleting(prev => !prev)
  }

  const handleConfirmDeleteStoryRequest = () =>{
    mutation.mutate({ storyRequestId })
  }

  return {
    isDeleting,
    handleDeleteStoryRequest,
    handleConfirmDeleteStoryRequest
  }
}