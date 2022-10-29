import { InputError } from "@/components/collections/inputs/regular/input.styled"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { isWriteupEditable, isWriteupHandler, isWriteupMember } from "../../utils"
import { 
  HeaderCaption,
  HeaderTitle, 
  HeaderWrapper } from "./header.styled"


type HeaderProps = {

}

const Header = ({}: HeaderProps) =>{
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()

  if ((isWriteupMember(writeup, staff.bastionId) || isWriteupHandler(writeup, staff.bastionId)) && isWriteupEditable(writeup) ) {
    return (
      <HeaderWrapper>
        <div>
          <HeaderTitle 
            id="title"
            name="title"
            defaultValue={ writeup.content[0].title }
            placeholder="Story title"
            aria-required="true" />
              <InputError id="error-title">Title should not be empty</InputError>
        </div>
        <div>
          <HeaderCaption 
            id="caption"
            name="caption"
            defaultValue={ writeup.content[0].title }
            placeholder="Enter story caption"
            aria-required="true" />
              <InputError id="error-caption">Caption should not be empty</InputError>
        </div>
      </HeaderWrapper>
    )
  }

  return (
    <HeaderWrapper>
      <HeaderTitle as="h1">{ writeup.content[0].title }</HeaderTitle>
      <HeaderCaption as="p">{ writeup.content[0].caption }</HeaderCaption>
    </HeaderWrapper>
  )
}


export default Header