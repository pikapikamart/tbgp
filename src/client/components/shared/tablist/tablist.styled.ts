import styled from "styled-components"
import {
  rem,
  fluid
} from "@/styled/functions"
import { RowCenter } from "@/styled/shared/helpers"


export const TablistWrapper = styled.div`

`

export const TabSelectionsWrapper = styled(RowCenter)`
  align-items: stretch;
  width: 100%;
`

export const TabSelections = styled(RowCenter)`
  border-radius: ${ rem(4) };
  flex-basis: 100%;
  flex-shrink: 1;
  min-height: ${ rem(48) };
  overflow: auto hidden;
  padding: 0 ${ rem(16) };

  ::-webkit-scrollbar {
    display: none;
  }

  ${({ theme: { colors } }) => `
    background-color: ${ colors.white3 };
    border: 1px solid ${ colors.grey3 };
  `}
`

export const Tab = styled.button`
  font-weight: 500;
  font-size: ${ fluid(13, 1.4, 14) };
  min-width: max-content;
  padding: 0 ${ fluid(12, 1.2, 16) };

  &:not(:last-of-type) {
    margin-right: ${ fluid(8, 1.5, 16) };
  }

  ${({ theme: { colors } }) => `
    color: ${ colors.grey2 };  

    &[aria-selected="true"] {
      color: ${ colors.blue };
      position: relative;

      &::before {
        content: "";
        border-radius: ${ rem(2) } ${ rem(2) };
        background-color: ${ colors.blue };
        height: ${ rem(3) };
        inset: calc(100% + ${ rem(12) }) auto auto 0;
        position: absolute;
        width: 100%;
      }
    }
  `}
`