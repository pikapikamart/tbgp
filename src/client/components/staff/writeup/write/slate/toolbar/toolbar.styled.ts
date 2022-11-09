import styled, { css } from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"


export const ToolbarWrapper = styled.ul`
  display: flex;
  font-family: 'Source Serif Pro', serif;
  margin-bottom: ${ fluid(16, 3, 32) };
  position: sticky;
  top: 0;
  z-index: 50;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  ${ ({ theme: { colors } }) => `
    box-shadow: 0 8px 12px 16px rgba(255, 255, 255, .8);
    background-color: ${ colors.white1 };
    border-top: 1px solid ${ colors.grey4 };
    border-bottom: 1px solid ${ colors.grey4 };
  ` }

  ${ breakpoint("tablet", `
      padding: ${ rem(8) };
      width: 100%;
    `) }

  &[inert="true"] {
    opacity: .7;
    position: static;
  }
`

export const ToolbarItem = styled.li`
  position: relative;
  
  &:not(:last-of-type) {
    margin-right: ${ fluid(4, 1, 8) };
  }
`

type MarkButtonProps = {
  decoration?: "underline" | "italic" | "bold",
  isActive?: boolean
}

export const MarkButton = styled.button<MarkButtonProps>`
  align-items: center;
  border-radius: 50%;
  color: ${ ({ theme }) => theme.colors.dark3 };
  display: flex;
  font-size: ${ fluid(20, 2, 22) };
  height: ${ rem(36) };
  place-content: center;
  width: ${ rem(36) };

  ${ ({ decoration, theme }) => {
    switch(decoration) {
      case "bold":
        return css`
          color: ${ theme.colors.dark1 };
          font-weight: 700;`
      case "italic":
        return css`font-style: italic;`
      case "underline":
        return css`text-decoration: underline;`
      }
    } }

  ${ ({ theme: { colors }, isActive }) => {
    switch(isActive) {
      case true: return css`
        color: ${ colors.blue };

        svg {
          fill: ${ colors.blue };

          g {
            fill: ${ colors.blue };
          }
        }
      `
    }
  } }
  

  ${ breakpoint("desktop", `
    transition: background-color .3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  `) }

  &[aria-disabled="true"] {
    opacity: .7;

    &:hover {
      cursor: not-allowed;
    }
  }

  > span {
    font-size: ${ rem(12) };
  }
  
`

export const HeadingMarkTrigger = styled(MarkButton)`
  background: url("/icons/icon-dropdown-down-small.svg") no-repeat calc(100% - 4px) center;  

  &[aria-expanded="true"] {
    background-color: rgba(0, 0, 0, .1);
  }
`

export const HeadingListWrapper = styled.ul`
  border-radius: ${ rem(4) };
  background-color: white;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .2);
  display: flex;
  padding: ${ rem(4) } ${ rem(8) };
  position: absolute;
  top: 100%;
  z-index: 10;

  ${ MarkButton } {
    
    &:not(:last-of-type) {
      margin-right: ${ rem(4) };
    }
  }
`

export const PasteLink = styled.input`
  background-color: white;
  border-radius: ${ rem(4) };
  border: 1px solid ${ ({ theme }) => theme.colors.blue };
  font-size: ${ fluid(14, 1.3, 16) };
  font-family: "libre franklin";
  height: ${ fluid(36, 4, 44) };
  padding: ${ rem(4) } ${ rem(8) };
  position: absolute;
  inset: 100% -${ rem(24) } auto auto;
  top: 100%;
  width: ${ rem(256) };
  z-index: 10;

  ${ breakpoint("tablet", `
    inset: 100% auto auto 0;
  `) }
`