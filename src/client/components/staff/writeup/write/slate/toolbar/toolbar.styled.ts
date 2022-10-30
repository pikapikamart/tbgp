import styled, { css } from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"


export const ToolbarWrapper = styled.ul`
  font-family: 'Source Serif Pro', serif;

  ${ ({ theme: { colors } }) => `
    ${ breakpoint("tablet", `
      display: flex;
      border-top: 1px solid ${ colors.grey4 };
      border-bottom: 1px solid ${ colors.grey4 };
      margin-bottom: ${ rem(32) };
      padding: ${ rem(8) };
      width: 100%;
    `) }
  ` }
`

export const ToolbarItem = styled.li`
  position: relative;
  
  &:not(:last-of-type) {
    margin-right: ${ rem(8) };
  }
`

type MarkButtonProps = {
  decoration?: "underline" | "italic" | "bold",
  isActive?: boolean
}

export const MarkButton = styled.button<MarkButtonProps>`
  border-radius: 50%;
  font-size: ${ rem(22) };
  height: ${ rem(36) };
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

  color: ${ ({ theme: { colors }, isActive }) => isActive? colors.blue : colors.dark3 };

  ${ breakpoint("desktop", `
    transition: background-color .3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  `) }

  > span {
    font-size: ${ rem(12) };
  }
`

export const HeadingMarkTrigger = styled(MarkButton)`
  background: url("/icons/icon-dropdown-down-small.svg") no-repeat right center;  

  &[aria-expanded="true"] {
    background-color: rgba(0, 0, 0, .1);
  }
`

export const HeadingListWrapper = styled.ul`

  ${ breakpoint("tablet", `
    border-radius: ${ rem(4) };
    background-color: white;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .2);
    display: flex;
    padding: ${ rem(4) } ${ rem(8) };
    position: absolute;
    top: 100%;

    ${ MarkButton } {
      
      &:not(:last-of-type) {
        margin-right: ${ rem(4) };
      }
    }
  `) }
`