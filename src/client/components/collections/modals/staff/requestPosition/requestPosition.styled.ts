import { 
  ComboBoxLabel,
  ComboBoxRole } from "@/components/shared/combobox/combobox.styled"
import { rem } from "@/styled/functions"
import { ModalWrapper } from "@/styled/shared/modal"
import styled from "styled-components"


export const RequestPositionWrapper = styled(ModalWrapper)`
  
  ${ ComboBoxLabel } {
    font-weight: 400;
  }

  ${ ComboBoxRole } {
    border-radius: 0;
    padding-bottom: ${ rem(2) };
  }
`