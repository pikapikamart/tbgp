import { 
  Navlink, 
  NavlinksItem, 
  NavlinksWrapper } from "@/styled/shared/header/navlinks"
import Link from "next/link"
import { useRouter } from "next/router"
import { linksData } from "./data"


export type NavlinksProps = {
  type: "admin" | "staff" | "guest"
}

const Navlinks = ({ type }: NavlinksProps) =>{
  const router = useRouter();

  // could extract component
  const renderLinks = () =>{
    const links = linksData[type]
    const navlinks = links.map(link => (
      <NavlinksItem key={ link.name }>
        <Link 
          href={ link.path }
          passHref>
            <Navlink aria-current={ router.pathname===link.path? "page" : "false" }>
              { link.name }
            </Navlink>
        </Link>
      </NavlinksItem>
    ))

    return navlinks
  }

  return (
    <NavlinksWrapper>
      { renderLinks() }
    </NavlinksWrapper>
  )
}


export default Navlinks;