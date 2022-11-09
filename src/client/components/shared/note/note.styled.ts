import styled, { css } from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"
import { SmallButton } from "@/styled/collections/button"


type NoteWrapperProps = {
  colored?: string
}

export const NoteWrapper = styled.div<NoteWrapperProps>`
  border-radius: ${ rem(4) };
  padding: ${ fluid(12, 1.1, 16) };

  > p {

    &:last-of-type {
      max-width: max-content;
    }
  }

  ${ breakpoint("tablet", `
    align-items: center;
    background: url("/icons/icon-information.svg") no-repeat ${ rem(16) } ${ rem(16) };
    display: flex;
    padding-left: ${ rem(44) };

    ${ SmallButton } {
      flex-shrink: 0 ;
    }
  `) }

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white4 };
    color: ${ colors.dark2 };

    ${ breakpoint("tablet", `
      background-color: ${ colors.white4 };
    `) }
  ` }

  ${ ({ colored, theme: { colors } }) => {
    switch(colored) {
      case "blue": 
        return css`
          background-color: ${ colors.blue };
            color: ${ colors.white1 };

          ${ breakpoint("tablet", `
            background: url("/icons/icon-information-white.svg") no-repeat ${ rem(16) } ${ rem(16) };
            `) }
        `
    }
  } }
`

type NoteTextProps = {
  margined?: boolean
}

export const NoteText = styled.p<NoteTextProps>`
  font-size: ${ fluid(13, 1.8, 15) };

  ${ ({ margined }) => `
    margin-bottom: ${ margined? rem(12) : 0 };

    ${ breakpoint("tablet", `
      margin-right: ${ margined? rem(32) : 0 };
      margin-bottom: 0;
    `) }
  ` }
`