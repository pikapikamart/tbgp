import { useExpansion } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { InitialStoryRequest } from "@/store/store.types"
import { RowCenter } from "@/styled/shared/helpers"
import { BaseModal } from "@/components/shared/modal"
import { categoryColors } from "../data"
import { 
  StoryRequestWrapper,
  Header,
  Title,
  Category,
  JoinedCount,
  Footer,
  Instruction,
  CreatedDate
 } from "./initial.styled"
import { StoryRequestModal } from "@/components/collections/modals/storyRequest"


type StoryRequestProps = {
  request: InitialStoryRequest
}

export const convertDateToString = ( date: string ) =>{
  const newDate = new Date(date)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const

  return newDate.toLocaleDateString(undefined, dateOptions)
}

const StoryRequest = ({ request }: StoryRequestProps) =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const modalContext = useModalContext()

  const handleSetModal = () =>{
    handleExpansion()
    modalContext.addModal(
      <BaseModal exit={ handleExpansion }>
        <StoryRequestModal storyRequestId={ request.storyRequestId } />
      </BaseModal>
    )
  }

  return (
    <StoryRequestWrapper>
      <Header>
        <Title
          onClick={ handleSetModal }
          aria-expanded={ isExpanded }>{ request.title }</Title>
        <RowCenter>
          <Category colored={ categoryColors[request.category] }>{ request.category.toLowerCase() }</Category>
          <JoinedCount as="p">
            <img 
            src="/icons/icon-profile-small.svg"
            alt="" />
            <span>{ request.members } joined</span>
          </JoinedCount>
        </RowCenter>
      </Header>
      <Footer>
        <Instruction>{ request.instruction }</Instruction>
        <CreatedDate>{ convertDateToString(request.createdAt) }</CreatedDate>
      </Footer>
    </StoryRequestWrapper>
  )
}


export default StoryRequest