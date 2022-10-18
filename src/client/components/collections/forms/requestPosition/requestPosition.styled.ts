import styled from "styled-components"
import { 
  rem,
  breakpoint } from "@/styled/functions"
import { ComboBoxRole } from "@/components/shared/combobox/combobox.styled"


export const RequestPositionWrapper = styled.form`
  display: grid;
  justify-items: center;
  max-width: ${ rem(224) };
  margin: 0 auto;

  ${ breakpoint("tablet", `
    margin-top: ${ rem(12) };
  `) }

  ${ ComboBoxRole } {
    border: none;
    border-bottom: 1px solid ${ ({ theme }) => theme.colors.grey1 };
    text-align: center;
    width: ${ rem(200) };
  }
`