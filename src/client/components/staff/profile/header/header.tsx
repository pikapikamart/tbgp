import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { InitialStaffState } from "@/store/slices/staff.slice"
import { HeadingLarge } from "@/styled/collections/text"
import Link from "next/link"
import { 
  HeaderBio,
  HeaderContentContainer, 
  HeaderEdit, 
  HeaderName, 
  HeaderWrapper } from "./header.styled"
import { HeaderProfileNote } from "./note"


type HeaderProps = {
  profile: InitialStaffState
}

const Header = ({ profile }:HeaderProps) =>{
  const staff = useSelectStaff()

  return (
    <HeaderWrapper>
      <HeaderProfileNote profile={ profile }/>
      <HeaderContentContainer>
        <HeaderName>
          <HeadingLarge>{ `${ profile.firstname } ${ profile.middlename?? "" } ${ profile.lastname }` }</HeadingLarge>
          { profile.position && <img src="/icons/icon-verified.svg" alt="" /> }
        </HeaderName>
        <HeaderBio>{ profile.bio? profile.bio : `Hi! My name is ${ profile.firstname } ${ profile.lastname }. I have yet to fill out my bio, but one thing's for sure, I love writing for The Bastion Group of Publications!` }</HeaderBio>
        { staff.bastionId===profile.bastionId && (
          <Link
            href="/storybuilder/settings"
            passHref>
            <HeaderEdit as="a">Edit profile</HeaderEdit>
          </Link>
        ) }
      </HeaderContentContainer>
    </HeaderWrapper>
  )
}


export default Header