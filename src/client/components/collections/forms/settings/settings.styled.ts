import styled from "styled-components"
import { 
  rem,
  fluid
 } from "@/styled/functions"
import { InputWrapper } from "../../inputs/regular/input.styled"


export const SettingsWrapper = styled.form`
  margin-top: ${ fluid(32, 5, 48) };
  text-align: left;
`

export const SettingsBio = styled(InputWrapper)``