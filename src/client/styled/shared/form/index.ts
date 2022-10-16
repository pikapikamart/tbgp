import styled from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"


type FormRowFieldsProps = {
  marginBottom?: number
}

export const FormRowFields = styled.div<FormRowFieldsProps>`
  display: grid;
  flex-wrap: wrap;
  gap: ${ rem(12) } ${ rem(16) };
  grid-template-columns: repeat(auto-fit, minmax(${ rem(230) }, 1fr));

  &:not(:last-of-type) {
    ${ ({ marginBottom }) => `
      margin-bottom: ${ rem(marginBottom?? 16) };
    ` }
  }
`

type FormBottomControlsProps = {
  marginTop?: number
}

export const FormBottomControls = styled.div<FormBottomControlsProps>`
  display: flex;
  margin-top:${ ({ marginTop }) => rem(marginTop?? 32) };

  > button {

    &:not(:last-of-type) {
      margin-right: ${ rem(8) };
    }
  }
`