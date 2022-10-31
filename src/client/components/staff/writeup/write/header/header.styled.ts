import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"
import { InputError } from "@/components/collections/inputs/regular/input.styled"


export const HeaderWrapper = styled.div`
  display: grid;
  gap: ${ fluid(16, 2.3, 24) } 0;
  margin-bottom: ${ fluid(24, 4, 40) }; 
`

const Input = styled.input`
  color: ${ ({ theme }) => theme.colors.dark2 };
  width: 100%;

  &:focus-visible {
    outline: none;
  }

  &[aria-invalid="true"] {

    + ${ InputError } {
      display: block;
      margin-left: 0;
    }
  }
`

export const HeaderTitle = styled(Input)`
  font-family: "Friz Quadrata Std Bold Italic";
  font-size: ${ fluid(24, 4, 40) };
  font-weight: 700;
`

export const HeaderCaption = styled(Input)`
  font-size: ${ fluid(16, 2, 18) };
  line-height: 1.4;
`