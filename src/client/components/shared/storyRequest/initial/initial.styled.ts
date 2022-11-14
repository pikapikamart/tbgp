import styled from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"
import { RowCenter } from "@/styled/shared/helpers"
import { motion } from "framer-motion"


export const StoryRequestWrapper = styled(motion.div)`
  border-radius: ${ rem(4) };
  line-height: 1.5;
  padding-bottom: ${ rem(32) };
  
  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey3 };
  ` }
`

export const InitialRequestHeader = styled.div`
  padding: ${ fluid(16, 2, 24) } ${ fluid(12, 1.2, 16) } ${ fluid(12, 1.2, 16) };

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.whiteBlue2 };
    border-bottom: 1px solid ${ colors.grey3 };
    border-radius: ${ rem(4) };
  ` }
`

export const Title = styled.button`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ fluid(15, 1.3, 17) };
  font-weight: 700;
  margin-bottom: ${ rem(8) };
  text-align: left;
`

type CategoryProps = {
  colored: string
}

export const Category = styled.p<CategoryProps>`
  background-color: ${({ theme, colored }) => theme.colors[colored]};
  border-radius: ${ rem(24) };
  color: #FFFFFF;
  display: inline-block;
  font-size: ${ rem(12) };
  font-weight: 500;
  padding: ${ rem(4) } ${ rem(8) };
`

export const JoinedCount = styled(RowCenter)`
  margin-left: ${ fluid(8, .9, 12) };
  padding-left: ${ fluid(14, 1.2, 18) };
  position: relative;

  &::before {
    content: "";
    background-color: black;
    border-radius: 50%;
    height: ${ rem(6) };
    inset: 50% auto auto 0;
    position: absolute;
    transform: translate(0, -50%);
    width: ${ rem(6) };
  }

  > span {
    color: ${ ({ theme }) => theme.colors.dark2 };
    font-size: ${ rem(14) };
    font-weight: 500;
    margin-left: ${ rem(8) };
  }
`

export const InitialRequestFooter = styled.div`
  padding: ${ rem(16) } ${ fluid(12, 1, 16) } 0;
`

export const Instruction = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-size: ${ fluid(14, 1.3, 15) };
  margin-bottom: ${ rem(24) };
  white-space: pre-wrap;
`

export const CreatedDate = styled.p`
  color: ${ ({ theme }) => theme.colors.dark1 };
  font-size: ${ rem(13) };
  font-weight: 600;
`