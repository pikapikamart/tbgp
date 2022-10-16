import styled from "styled-components"
import { rem } from "@/styled/functions"


export const SetupWrapper = styled.form`
  text-align: left;
`

type SetupFieldsRowContainerProps = {
  marginBottom?: number
}

export const SetupFieldsRowContainer = styled.div<SetupFieldsRowContainerProps>`
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