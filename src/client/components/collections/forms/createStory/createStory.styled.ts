import styled from "styled-components"
import { rem } from "@/styled/functions"
import { SmallButton } from "@/styled/collections/button"


export const CreateStoryWrapper = styled.form`
  display: grid;
  gap: ${ rem(16) } 0 ;
  text-align: left;
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