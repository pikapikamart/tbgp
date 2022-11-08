import { 
  breakpoint, 
  rem } from "@/styled/functions"
import styled from "styled-components"


export const NavlinksWrapper = styled.div`
  border-top: 1px solid ${ ({ theme }) => theme.colors.grey3 };
  margin-top: ${ rem(24) };
  padding-top: ${ rem(32) };

  ${ breakpoint("desktop", `
    all: revert;
  `) }
`

export const NavlinksList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${ rem(40) };

  ${ breakpoint("desktop", `
    margin-left: revert;
    padding-top: ${ rem(16) };
  `) }
`

export const NavlinksListItem = styled.li`
  color: ${ ({ theme }) => theme.colors.dark1 };
  font-family: "Friz Quadrata Std Medium";
  margin: 0 0 ${ rem(32) } ${ rem(40) };

  ${ breakpoint("desktop", `
    margin: revert;

    &:not(:last-of-type){
      margin-right: ${ rem(40) };
    }
  `) }
`