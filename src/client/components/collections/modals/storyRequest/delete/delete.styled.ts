import styled from "styled-components"
import { rem } from "@/styled/functions";
import { ColoredLongRoundButton } from "@/styled/collections/button";


export const DeleteOption = styled(ColoredLongRoundButton)`

  &:first-of-type {
    margin-bottom: ${ rem(4) };
  }
`