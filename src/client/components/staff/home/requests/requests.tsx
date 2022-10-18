import { TabInterface } from "@/components/shared/tablist"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { StaffState } from "@/store/slices/staff.slice"
import { 
  requestsParams, 
  requestsParamsEditor } from "./data"
import { CreateRequestButton, RequestsWrapper } from "./requests.styled"


const isEditor = ( staff: StaffState ) =>{
  
  if ( !staff.position ) {
    return false
  }

  return staff.position.role==="sectionEditor" || staff.position.role==="seniorEditor"
}

const Requests = () =>{
  const staff = useSelectStaff()
  const modalContent = useModalContext()

  const handleSetModal = () =>{
  }

  return (
    <RequestsWrapper>
      <TabInterface 
        paramsPaths={ isEditor(staff)? requestsParamsEditor : requestsParams }
        extraChildren={ <>
          <CreateRequestButton 
            colored="darkBlue"
            onClick={ handleSetModal }>
            <img 
              src="/icons/icon-add.svg" 
              alt=""
              width="7px" />
            <img 
              src="/icons/icon-add-large.svg" 
              alt="" />
            <span>
              Create Request
            </span>
          </CreateRequestButton>
        </> } >
      
      </TabInterface>
    </RequestsWrapper>
  )
}


export default Requests