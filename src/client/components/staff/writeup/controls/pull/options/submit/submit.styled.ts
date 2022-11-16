import { ColoredMediumButton } from "@/styled/collections/button"
import styled from "styled-components"


export const SubmitWrapper = styled(ColoredMediumButton)`

  &[aria-invalid="true"] {
    background-color: ${ ({ theme }) => theme.colors.grey3 };
    cursor: not-allowed;
  }
`