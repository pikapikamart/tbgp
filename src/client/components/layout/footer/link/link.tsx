import { FooterNavlink } from "../footer.styled"
import LinkComp from "next/link"


type LinkProps = {
  path: string,
  children: React.ReactNode
}

const Link = ({ path, children }: LinkProps) =>{

  return (
    <FooterNavlink>
      <LinkComp
        href={ path }
        passHref>
          <a>{ children }</a>
      </LinkComp>
    </FooterNavlink>
  )
}


export default Link