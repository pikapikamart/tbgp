import { WriteHeaderSection } from "./header"
import { WriteSlateSection } from "./slate"
import { WriteWrapper } from "./write.styled"


const Write = () =>{

  return (
    <WriteWrapper>
      <WriteHeaderSection />
      <WriteSlateSection />
    </WriteWrapper>
  )
}


export default Write