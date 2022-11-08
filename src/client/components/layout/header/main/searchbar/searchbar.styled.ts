import { 
  breakpoint, 
  rem } from "@/styled/functions"
import { RowCenter } from "@/styled/shared/helpers"
import styled from "styled-components"


export const SearchbarWrapper = styled.div`
  position: relative;

  ${ breakpoint("desktop", `
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
  `) }
`

export const Searchbar = styled(RowCenter)`
  font-size: ${ rem(14) };

  ${ breakpoint("desktop", `
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    transition: 
      max-width .3s ease,
      opacity .3s ease,
      visibility .3s ease;
    visibility: hidden;
  `) }
`

export const SearchbarTrigger = styled.button`
  background: url("/icons/icon-search-med.svg") no-repeat center center;
  border-radius: 50%;
  display: none;
  height: ${ rem(32) };
  margin-right: ${ rem(24) };
  width: ${ rem(32) };

  ${ breakpoint("desktop", `
    display: block;
    margin-left: ${ rem(8) };

    &[aria-expanded="true"] {

      ~ ${ Searchbar } {
        max-width: ${ rem(1000) };
        opacity: 1;
        visibility: visible;
      }
    }
  `) }
`

export const Input = styled.input`
  border-radius: ${ rem(4) };
  height: ${ rem(40) };
  max-width: ${ rem(240) };
  margin-right: ${ rem(8) };
  padding: 0 ${ rem(12) };

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey3 };
    color: ${ colors.dark3 };
  ` }

  ${ breakpoint("desktop", `
    &:focus-visible {
      outline: none;
    }
  `) }
`

export const Find = styled.button`
  border-radius: ${ rem(4) };
  height: ${ rem(40) };
  padding: 0 ${ rem(12) };

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.darkBlue };
    color: ${ colors.white1 };

    ${ breakpoint("desktop", `
      transition: background-color .3s ease;

      &:focus-visible,
      &:hover {
        background-color: ${ colors.blue };
        outline: none;
      }
    `) }
  ` }
`