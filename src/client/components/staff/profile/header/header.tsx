import { Note } from "@/components/shared/note"
import { useStaffState } from "@/lib/hooks/store.hooks"
import { SmallButton } from "@/styled/collections/button"
import { HeadingLarge } from "@/styled/collections/text"
import { 
  HeaderBio,
  HeaderContentContainer, 
  HeaderEdit, 
  HeaderWrapper } from "./header.styled"


const Header = () =>{
  const staff = useStaffState()

  return (
    <HeaderWrapper>
      { !staff.position && (
        <Note
          text="Only verified accounts can participate and create articles. Verify your account now by sending a request, verifying your The Bastion position.">
          <SmallButton colored="darkBlue" >Verify</SmallButton>
        </Note>
      ) }
      <HeaderContentContainer>
        <HeadingLarge>{ staff.firstname + " " + staff.lastname }</HeadingLarge>
        <HeaderBio>
          { staff.bio? staff.bio : "Hi! My name is Raymart Pamplona. I have yet to fill out my bio, but one thing's for sure, I love writing for The Bastion Group of Publications!" }
        </HeaderBio>
        <HeaderEdit>Edit profile</HeaderEdit>
      </HeaderContentContainer>
    </HeaderWrapper>
  )
}


export default Header