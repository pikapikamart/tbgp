import styled from "styled-components"
import { fluid } from "@/styled/functions"
import { InitialWriteupWrapper } from "@/components/shared/writeup/initial/initial.styled"


export const InitialWriteupsList = styled.ul`
  ${ InitialWriteupWrapper } {
    &:not(:last-of-type) {
      margin-bottom: ${ fluid(10, 1, 12) };
    }
  }
`