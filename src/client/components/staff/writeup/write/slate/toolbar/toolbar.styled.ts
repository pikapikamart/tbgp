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
`