import styled from "styled-components"
import { 
  rem,
  breakpoint } from "@/styled/functions"


export const NotesWrapper = styled.div`
  padding: ${ rem(24) } ${ rem(32) } ${ rem(24) };
`

export const NotesHeading = styled.h3`
  font-size: ${ rem(14) };
  margin-bottom: ${ rem(16) };
`

export const NoteListItem = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, .1);

  &:not(:last-of-type) {
    margin-bottom: ${ rem(16) };
  }
`

export const NoteSummary = styled.summary`
  align-items: center;
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  padding-bottom: ${ rem(16) };

  svg {
    transition: transform .3s ease;
    transform-origin: center;

    path {
      transistion: strong .3s ease;
    }
  }

  ${ breakpoint('desktop', `
    
    &:hover {
      cursor: pointer;
    }
  `) }
`

export const NoteDetails = styled.details`
  
  &[open] > ${ NoteSummary } {

    > svg {
      transform: rotate(-180deg);

      path {
        stroke: ${ ({ theme }) => theme.colors.red };
      }
    }
  }
`

export const NoteMessage = styled.p`
  font-size: ${ rem(14) };
  line-height: 1.4;
  padding: 0 ${ rem(24) } ${ rem(16) };
  white-space: pre-wrap;
`