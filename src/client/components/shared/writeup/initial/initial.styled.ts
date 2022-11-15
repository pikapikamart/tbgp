import styled from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"
import { RowCenter } from "@/styled/shared/helpers"
import { Category } from "../../storyRequest/initial/initial.styled"
import { motion } from "framer-motion"


export const InitialWriteupWrapper = styled(motion.li)`
  border-radius: ${ rem(4) };
  border: 1px solid ${ ({ theme }) => theme.colors.grey3 };
  padding: ${ fluid(12, 2.5, 18) } ${ fluid(16, 3.5, 24) };
`

export const WriteupTitle = styled.h2`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ fluid(15, 2.5, 16) };
  margin-bottom: ${ fluid(4, .5, 8) };
`

export const WriteupCaption = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-size: ${ fluid(13, 2, 14) };
`

export const WriteupStatusContainer = styled(RowCenter)`
  margin-top: ${ rem(8) };

  > ${ Category } {
    
    &:not(:last-of-type) {
      margin-right: ${ rem(8) };
    }
  }
`