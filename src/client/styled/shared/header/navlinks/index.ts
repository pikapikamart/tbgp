import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";


export const NavlinksWrapper = styled.ul`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  display: none;
  margin-bottom: ${ rem(16) };
  padding-bottom: ${ rem(24) };

  ${ breakpoint("tablet", `
    align-items: center;
    border-bottom: none;
    display: flex;
    margin-bottom: 0;
    padding-bottom: 0;
  `) }
`

export const NavlinksItem = styled.li`

  &:not(:last-of-type) {
    margin-bottom: ${ rem(16) };
  }

  ${ breakpoint("tablet", `
    &:not(:last-of-type) {
      margin: 0 ${ rem(16) } 0 0;
    }
  `) }
`

export const Navlink = styled.a`
  color: ${({ theme }) => theme.colors.grey1};
  font-size: ${ rem(16) };
  font-weight: 500;

  ${({ theme }) => `

    &[aria-current="page"] {
      color: ${ theme.colors.darkBlue };
      position: relative;
    
      &::before {
        content: "";
        background-color: ${ theme.colors.darkBlue };
        position: absolute;
      }
    }

    ${ breakpoint("tablet", `
      font-size: ${ fluid(14, 1.1, 15) };

      &[aria-current="page"] {
        padding-left: 0;

        &::before {
          border-radius: ${ rem(2) } ${ rem(2) } 0 0;
          height: ${ rem(4) };
          top: ${ rem(36) };
          width: 100%;
        }
      }
    `) }
  `}
`