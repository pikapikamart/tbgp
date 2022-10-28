import { 
  VerificationItem, 
  VerificationOption, 
  VerificationRequester } from "@/components/admin/home/verifications/list/list.styled"
import { useAcceptOrRejectRequest } from "../storyRequest.hook"
import {
  ContentContainer
} from "../storyRequest.styled"


const Requests = () =>{
  const {
    filteredRequests, 
    handleRequestChoice } = useAcceptOrRejectRequest()

  return (
    <ContentContainer as="ul">
      { filteredRequests.map(request => (
        <VerificationItem 
          customed={ true }
          key={ request.bastionId }>
          <VerificationRequester>{ request.firstname + " " + request.lastname }</VerificationRequester>
          <VerificationOption
            bgColor="blue"
            type="button"
            onClick={ () => handleRequestChoice(true, request.bastionId) }>Accept
          </VerificationOption>
          <VerificationOption
            bgColor="red"
            type="button"
            onClick={ () => handleRequestChoice(false, request.bastionId) }>Reject
          </VerificationOption>
        </VerificationItem>
      )) }
    </ContentContainer>
  )
}


export default Requests