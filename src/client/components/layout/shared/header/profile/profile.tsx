import { useProfileExpansion } from "@/lib/hooks";
import { 
  ProfileContainer,
  ProfileMenu,
  ProfileName,
  ProfileWrapper } from "@/styled/shared/header/profile";
import { SrOnly } from "@/styled/shared/helpers";
import { useSession } from "next-auth/react";


const Profile = () =>{
  const { data } = useSession()
  const {
    isExpanded,
    handleExpansion,
    wrapperRef
  } = useProfileExpansion()

  return (
    <ProfileWrapper ref={ wrapperRef }>
      <ProfileContainer>
        <ProfileName>{ data?.user?.name }</ProfileName>
        <p>{ data?.user?.email }</p>
      </ProfileContainer>
      <ProfileMenu 
        aria-expanded={ isExpanded }
        onClick={ handleExpansion }>
        <SrOnly>Menu</SrOnly>
      </ProfileMenu>
    </ProfileWrapper>
  )
}


export default Profile;