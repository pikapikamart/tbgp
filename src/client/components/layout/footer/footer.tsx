import { trpc } from "@/lib/trpc"
import { SrOnly } from "@/styled/shared/helpers"
import Link from "next/link"
import { 
  FooterContentContainer, 
  FooterCopyright, 
  FooterHeader, 
  FooterLogoLink, 
  FooterNavlinksList, 
  FooterNavlinksListItem, 
  FooterWrapper } from "./footer.styled"
import { FooterLink } from "./link"


const Footer = () =>{
  const query = trpc.useQuery(["categories.get-all"])

  const renderReadingsLinks = () =>{
    if ( query.isError || !query.data ) {
      return <></>
    }

    const readingsLinks = query.data.data.map(link => (
      <FooterLink 
        key={ link }
        path={ `/readings/${ link }` }>
        { link }
      </FooterLink>
    ))

    return readingsLinks
  }

  return (
    <FooterWrapper>
      <FooterContentContainer>
        <FooterHeader>
          <Link
            href="/"
            passHref>
              <FooterLogoLink>
                <SrOnly>Homepage</SrOnly>
                <img
                src="/logos/bastion-logo-main-big.svg"
                alt="The Bastion Group of Publications" />
              </FooterLogoLink>
          </Link>
          <p>The Official Student Publication Of President Ramon Magsaysay State University Main Campus - Iba</p>
        </FooterHeader>
        <FooterNavlinksList>
          <FooterNavlinksListItem>
            General
            <ul>
              <FooterLink path="/">Home</FooterLink>
            </ul>
          </FooterNavlinksListItem>
          <FooterNavlinksListItem>
            Readings
            <ul>
              { renderReadingsLinks() }
            </ul>
          </FooterNavlinksListItem>
          <FooterNavlinksListItem>
            For writers
            <ul>
              <FooterLink path="/storybuilder/login" >Login</FooterLink>
            </ul>
          </FooterNavlinksListItem>
          <FooterNavlinksListItem>
            Find us here
            <ul>
              <li>
                <a
                  target="_blank" 
                  href="https://www.facebook.com/PRMSUTBGP"
                  rel="noreferrer">
                  <SrOnly>facebook</SrOnly>
                  <img
                    src="/icons/icon-facebook-square.svg"
                    alt="" />
                </a>
              </li>
            </ul>
          </FooterNavlinksListItem>
        </FooterNavlinksList>
      </FooterContentContainer>
      <FooterCopyright>© 2022, The Bastion Group of Publications</FooterCopyright>
    </FooterWrapper>
  )
}


export default Footer