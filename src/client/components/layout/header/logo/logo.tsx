import { HeaderLogoWrapper } from "@/styled/shared/header";
import { 
  BlockLink, 
  SrOnly } from "@/styled/shared/helpers";
import Link from "next/link";


type LogoProps = {
  href: string,
  src: string
}

const Logo = ( { href, src }: LogoProps ) =>{

  return(
    <div>
      <Link 
        href={ href }
        passHref>
          <BlockLink>
            <SrOnly>Homepage</SrOnly>
            <HeaderLogoWrapper
              src={ src }
              alt="The Bastion Group of Publications" />
          </BlockLink>
      </Link>
    </div>
  )
}


export default Logo;