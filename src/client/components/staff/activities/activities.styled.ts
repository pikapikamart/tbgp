import styled from "styled-components"
import { rem } from "@/styled/functions"
import { HeadingVSmall } from "@/styled/collections/text"


export const MainWrapper = styled.main`
  padding: ${ rem(32) } ${ rem(24) };
`

export const MainContentContainer = styled.div`
  margin: 0 auto;
  max-width: ${ rem(896) };
`

export const MainHeadingContainer = styled.div`
  ${ HeadingVSmall } {
    margin-bottom: ${ rem(8) }
  }
`