import styled from "styled-components"
import { rem } from "@/styled/functions"
import { ColoredLongRoundButton } from "@/styled/collections/button"


export const RoundChoice = styled(ColoredLongRoundButton)`

  &:not(:last-of-type) {
    margin-bottom: ${ rem(4) };
  }
`