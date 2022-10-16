import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"
import { NoteWrapper } from "@/components/shared/note/note.styled"
import { ColoredMediumButton } from "@/styled/collections/button"
import { RowCenter } from "@/styled/shared/helpers"


export const HeaderWrapper = styled.div`

  ${ NoteWrapper } {
    margin-bottom: ${ rem(32) };
  }
`

export const HeaderContentContainer = styled.div`
  
  ${ breakpoint("tablet", `
    display: grid;
    gap: ${ rem(12) };
    grid-template-columns: 1fr max-content;
  `) }
`

export const HeaderName = styled(RowCenter)`
  
  > img {
    margin-left: ${ rem(8) };
    height: 100%;
  }
`

export const HeaderBio = styled.p`
  font-size: ${ fluid(14, 2, 15) };
  margin: ${ rem(12) } 0;
  white-space: pre-wrap;
  
  ${ breakpoint("tablet", `
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    margin: 0;
  `) }
`

export const HeaderEdit = styled(ColoredMediumButton)`

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white2 };
    border: 1px solid ${ colors.grey3 };
    color: ${ colors.dark3 };
  ` }

  ${ breakpoint("tablet", `
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  `) }
`