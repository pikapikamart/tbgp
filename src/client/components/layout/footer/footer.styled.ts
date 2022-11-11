import styled from "styled-components"
import { 
  rem,  
  fluid, 
  breakpoint} from "@/styled/functions"


export const FooterWrapper = styled.footer`
  padding: ${ rem(64) } ${ rem(24) } ${ fluid(64, 10, 80) };

  ${ ({ theme: { colors } }) => `
    border-top: .5px solid ${ colors.grey1 };
    background-color: ${ colors.white4 };
  ` }

  ${ breakpoint("desktop", `
    padding-left: ${ rem(112) };
  `) }
`

export const FooterContentContainer = styled.div`
  
  ${ breakpoint("desktop", `
    align-items: flex-start;    
    display: flex;
    flex-wrap: wrap;
  `) }
`

export const FooterHeader = styled.div`
  color: ${ ({ theme }) => theme.colors.dark2 };
  flex-basis: ${ rem(320) };
  font-size: ${ rem(15) };
  line-height: 1.4;
  margin-bottom: ${ rem(56) };
  text-align: center;

  ${ breakpoint("desktop", `
    margin-right: ${ rem(112) };
  `) }
`

export const FooterLogoLink = styled.a`
  display: block;
  max-width: max-content;
  margin: 0 auto ${ fluid(10, 1.2, 16) };
`

export const FooterNavlinksList = styled.ul`
  align-item: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${ rem(40) } ${ fluid(48, 7, 80) };
`

export const FooterNavlinksListItem = styled.li`
  color: ${ ({ theme }) => theme.colors.dark1 };
  font-size: ${ rem(13) };
  font-weight: 600;
  text-transform: uppercase;

  > ul {
    margin-top: ${ rem(16) };
  }
`

export const FooterNavlink = styled.li`
  font-weight: 400;
  font-size: ${ rem(14) };
  text-transform: capitalize;

  &:not(:last-of-type) {
    margin-bottom: ${ rem(16) };
  }
`

export const FooterCopyright = styled.p`
  font-size: ${ rem(14) };
  line-height: 1.4;
  max-width: max-content;
  margin: ${ fluid(56, 10, 96) } auto 0;
`