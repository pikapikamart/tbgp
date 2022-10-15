import { 
  DropdownOption, 
  DropdownWrapper } from "@/styled/shared/header/dropdown";
import { 
  ProfileName, 
  ProfileContainer } from "@/styled/shared/header/profile";
import { 
  signOut,
  useSession } from "next-auth/react";
import { 
  HeaderNavlinks,
  NavlinksProps } from "@/components/layout/header/navlinks";


type DropdownProps = NavlinksProps

const Dropdown = ( { type }: DropdownProps ) => {
  const { data } = useSession()

  return (
    <DropdownWrapper>
      <ProfileContainer>
        <ProfileName>{ data?.user?.name }</ProfileName>
        <p>{ data?.user?.email }</p>
      </ProfileContainer>
      <HeaderNavlinks type={ type } />
      <ul>
        {/* add for staff conditional */}
        <li>
          <DropdownOption 
            as="button"
            onClick={() => signOut({ callbackUrl: type==="admin"? "/admin/login" : "/storybuilder/login" }) }>
            <span />
            Sign out
          </DropdownOption>
        </li>
      </ul>
    </DropdownWrapper> 
  )
}


export default Dropdown;