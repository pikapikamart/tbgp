import { rem } from "@/styled/functions"
import { RowCenter } from "@/styled/shared/helpers"
import styled from "styled-components"


export const SearchbarWrapper = styled(RowCenter)`
  font-size: ${ rem(14) };
`

export const Input = styled.input`
  border-radius: ${ rem(4) };
  height: ${ rem(40) };
  max-width: ${ rem(240) };
  margin-right: ${ rem(8) };
  padding: 0 ${ rem(12) };

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey3 };
    color: ${ colors.dark3 };
  ` }
`

export const Find = styled.button`
  border-radius: ${ rem(4) };
  height: ${ rem(40) };
  padding: 0 ${ rem(12) };

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.darkBlue };
    color: ${ colors.white1 };
  ` }
`