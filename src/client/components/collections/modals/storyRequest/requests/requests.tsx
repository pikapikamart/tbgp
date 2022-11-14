import { 
  VerificationItem, 
  VerificationOption, 
  VerificationRequester } from "@/components/admin/home/verifications/list/list.styled"
import { useAcceptOrRejectRequest } from "./requests.hook"
import { ContentContainer } from "../storyRequest.styled"
import { 
  AnimatePresence,
  motion } from "framer-motion"
import { baseStaggerVariant, storyRequestRequestsVariant } from "@/src/client/motion"


const Requests = () =>{
  const {
    filteredRequests, 
    handleRequestChoice } = useAcceptOrRejectRequest()

  return (
    <ContentContainer 
      as={ motion.ul }
      initial="initial"
      animate="animate"
      exit="exit"
      variants={ baseStaggerVariant }>
      <AnimatePresence>
        { filteredRequests.map(request => (
          <VerificationItem 
            customed="true"
            key={ request.bastionId }
            variants={ storyRequestRequestsVariant }>
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
      </AnimatePresence>
    </ContentContainer>
  )
}


export default Requests