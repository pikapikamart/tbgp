import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { 
  Navlink, 
  NavlinksItem, 
  NavlinksWrapper } from "../navlinks";
import { RowCenter } from "../../helpers";


export const DropdownWrapper = styled.div`  
  background-color: ${({ theme }) => theme.colors.white1};
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, .2);
  inset: 102% 0 auto 0;
  opacity: 0;
  padding: ${ rem(24) } ${ rem(24) } ${ rem(64) };
  position: absolute;
  transition: opacity .5s ease, visibility .5s ease;
  visibility: hidden;
  z-index: 50;

  ${ NavlinksWrapper } {
    display: block;
  }

  ${ breakpoint("tablet",`
    inset: 102% ${ fluid(24, 3, 40) } auto auto;
    width: ${ rem(256) };

    ${ NavlinksWrapper } {
      display: none;
    }
  `)
  }

  ${ Navlink } {
    &[aria-current="page"] {
      color: ${({ theme }) => theme.colors.darkBlue};
      padding-left: ${ rem(12) };
  
      &::before {
        border-radius: 0 ${ rem(4) } ${ rem(4) } 0;
        height: ${ rem(28) };
        inset: -${ rem(5) } auto auto 0;
        width: ${ rem(4) };
      }
    }
  }
`

export const DropdownItem = styled.li`
  color: ${({ theme }) => theme.colors.dark2};
  font-size: ${ rem(16) };
  font-weight: 500;

  &:not(:last-of-type) {
    margin-bottom: ${ rem(18) };
  }

  &:first-of-type {
    
    span {
      background-image: url("/icons/icon-profile.svg");
    }
  }

  &:last-of-type {
    color: ${({ theme }) => theme.colors.red};

    span {
      background-image: url("/icons/icon-signout.svg");
    }
  }
` 

export const DropdownOption = styled(RowCenter)`
  span {
    background: no-repeat center center 100%;
    height: ${ rem(20) };
    margin-right: ${ rem(6) };
    width: ${ rem(20) };
  }
`