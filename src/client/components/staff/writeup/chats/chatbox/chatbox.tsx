import { simpleFadeVariant } from "@/src/client/motion"
import {} from "../"
import { ChatboxWrapper } from "./chatbox.styled"


const Chatbox = () =>{

  return (
    <ChatboxWrapper
      initial="initial"
      animate="animate"
      exit="exit"
      variants={ simpleFadeVariant }>

    </ChatboxWrapper>
  )
}


export default Chatbox