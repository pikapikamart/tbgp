import { InitialStoryRequest } from "@/store/slices/storyRequests.slice"
import { RowCenter } from "@/styled/shared/helpers"
import { categoryColors } from "./data"
import { 
  StoryRequestWrapper,
  Header,
  Title,
  Category,
  JoinedCount,
  Footer,
  Instruction,
  CreatedDate
 } from "./storyRequest.styled"


type StoryRequestProps = {
  request: InitialStoryRequest
}

export const convertDateToString = ( date: string ) =>{
  const newDate = new Date(date)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const

  return newDate.toLocaleDateString(undefined, dateOptions)
}

const StoryRequest = ({ request }: StoryRequestProps) =>{

  return (
    <StoryRequestWrapper>
      <Header>
        <Title>{ request.title }</Title>
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