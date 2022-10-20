import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"


type AssignMembersProps = {
  children: React.ReactNode
}

const AssignMembers = ({ children }: AssignMembersProps) =>{

  return (
    <ModalWrapper
      size="small"
      padding="medium">
      <ModalHeading size="small">Assign Members</ModalHeading>
      { children }
    </ModalWrapper>
  )
}


export default AssignMembers