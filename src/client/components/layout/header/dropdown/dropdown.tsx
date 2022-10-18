import { 
  DropdownItem,
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
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks/store.hooks";
import { selectStaff } from "@/store/slices/staff.slice";


type DropdownProps = NavlinksProps

const Dropdown = ( { type }: DropdownProps ) => {
  const { data } = useSession()
  const staff = useAppSelector(selectStaff)

  return (
    <DropdownWrapper>
      <ProfileContainer>
        <ProfileName>{ data?.user?.name }</ProfileName>
        <p>{ data?.user?.email }</p>
      </ProfileContainer>
      <HeaderNavlinks type={ type } />
      <ul>
        { data?.user?.userType==="staff" && (
          <DropdownItem>
            <Link
              href={ `/storybuilder/${ staff.username }`}
              passHref>
                <DropdownOption as="a">
                  <span />
                  Profile
                </DropdownOption>
            </Link>
          </DropdownItem>
        ) }
        <DropdownItem>
          <DropdownOption 
            as="button"
            onClick={() => signOut({ callbackUrl: type==="admin"? "/admin/login" : "/storybuilder/login" }) }>
            <span />
            Sign out
          </DropdownOption>
        </DropdownItem>
      </ul>
    </DropdownWrapper> 
  )
}


export default Dropdown;