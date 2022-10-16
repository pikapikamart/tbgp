import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"


export const NoteWrapper = styled.div`
  border-radius: ${ rem(4) };
  padding: ${ fluid(12, 1.1, 16) };

  ${ breakpoint("tablet", `
    align-items: center;
    background: url("/icons/icon-information.svg") no-repeat ${ rem(16) } ${ rem(16) };
    display: flex;
    padding-left: ${ rem(44) };
  `) }

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white4 };
    color: ${ colors.dark2 };

    ${ breakpoint("tablet", `
      background-color: ${ colors.white4 };
    `) }
  ` }
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