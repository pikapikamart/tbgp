import styled from "styled-components"
import { fluid, rem } from "@/styled/functions"
import { SmallButton } from "@/styled/collections/button"


export const CreateStoryWrapper = styled.form`
  display: grid;
  gap: ${ rem(16) } 0 ;
  text-align: left;

  // overwrites for the date-picker
  // label
  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
    color: ${ ({ theme }) => theme.colors.dark2 };
    font-weight: 700;
    font-size: ${ fluid(14, 1.2, 15) };
    position: static;
    transition: none;
    transform: none;
  }

  // legend
  .css-14lo706 {
    width: 0;
  }

  // helperText for the input
  .MuiFormHelperText-root {
    ${({ theme }) => `
    color: ${ theme.colors.red };
    font-size: ${ rem(13) };
  `}
  }
` 

export const AssignMembersContainer = styled.div`
  
  ${ SmallButton } {
    display: block;
    margin-top: ${ rem(4) };
  }
`

export const AssignedMembersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${ rem(8) } 0 ${ rem(16) } -${ rem(6) } ;
`

export const AssignedMember = styled.p`
  background-color: hsl(0, 0%, 90%);
  border-radius: ${ rem(4) };
  border: 1px solid ${ ({ theme }) => theme.colors.grey3 };
  font-size: 85%;
  margin: ${ rem(4) } 0 0 ${ rem(6) };
  padding: ${ rem(3) } ${ rem(6) };
`