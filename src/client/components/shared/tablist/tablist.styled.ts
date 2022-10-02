import styled from "styled-components"
import {
  rem,
  fluid
} from "@/styled/functions"
import { RowCenter } from "@/styled/shared/helpers"


export const TablistWrapper = styled.div`

`

export const TabSelections = styled(RowCenter)`
  border-radius: ${ rem(4) };
  margin-bottom: ${ rem(24) };
  min-height: ${ rem(48) };
  padding: 0 ${ rem(16) };

  ${({ theme: { colors } }) => `
    background-color: ${ colors.white3 };
    border: 1px solid ${ colors.grey3 };
  `}
`

export const Tab = styled.button`
  font-weight: 500;
  font-size: ${ fluid(13, 1, 14) };
  padding: 0 ${ fluid(24, 3.5, 32) };

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