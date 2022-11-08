import styled from "styled-components"
import {
  rem,
  fluid
} from "@/styled/functions"
import { ColoredMediumButton } from "@/styled/collections/button"


export const ResubmitContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: ${ rem(24) } ${ fluid(16, 3, 32) } ${ rem( 48) };
`

export const ResubmitControls = styled.div`
  opacity: 0;
  transition: 
    opacity .3s ease,
    visibility .3s ease;
  visibility: hidden;
`

export const Notes = styled.div`
  color: ${ ({ theme }) => theme.colors.dark2 };
  display: grid;
  gap: ${ rem(16) } 0;
  margin-bottom: 0;
  max-height: 0;
  overflow-y: hidden;
  opacity: 0;
  transition:
    max-height .3s ease,
    margin-bottom .3s ease,
    opacity .3s ease,
    visibility .3s ease;
  visibility: hidden;
  width: 100%;
`

export const NoteContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .15);
  padding-bottom: ${ rem(16) };
  width: 100%;
`

export const NoteTitleInput = styled.input`
  font-size: ${ rem(15) };
  font-weight: 600;
  margin-bottom: ${ rem(12) };
  width: 100%;

  &:focus-visible {
    outline: none;
  }
`
export const NoteMessageText = styled.textarea`
  font-size: ${ rem(14.5) };
  margin-bottom: ${ rem(8) };
  padding: 0 ${ rem(24) };
  resize: none;
  width: 100%;

  &:focus-visible {
    outline: none;
  }
`

export const RemoveNote = styled.button`
  border-radius: ${ rem(4) };
  font-size: ${ rem(12) };
  padding: ${ rem(4) } ${ rem(6) };

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.dark1 };
    color: ${ colors.white1 };
  ` }
`

export const AddNote = styled.button`
  border-radius: 50%;
  background-color: ${ ({ theme }) => theme.colors.blue };
  display: grid;
  height: ${ fluid(40, 4, 48) };
  margin: 0 auto;
  place-content: center;
  width: ${ fluid(40, 4, 48) };

  svg {
    fill: white;
  }
`

export const NotesHeading = styled.h3`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ rem(14) };
`

export const ResubmitTrigger = styled(ColoredMediumButton)`
  max-height: ${ rem(300) };
  overflow: hidden;
  transition: 
    opacity .3s ease,
    max-height .3s ease,
    padding .3s ease,
    visibility .3s ease;
  
  &[aria-expanded="true"] {
    max-height: 0px;
    opacity: 0;
    padding: 0;
    visibility: hidden;

    & ~ ${ ResubmitControls } {
      opacity: 1;
      visibility: visible;
    }

    & ~ ${ Notes } {
      max-height: ${ rem(3000) };
      margin-bottom: ${ rem(24) };
      opacity: 1;
      visibility: visible;
    }
  }
`

export const ResubmitSendBack = styled(ColoredMediumButton)`
  margin-right: ${ rem(8) };
`