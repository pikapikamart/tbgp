import styled, { css } from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { DefaultText } from "@/styled/collections/text";
import { motion } from "framer-motion"


export const VersionWrapper = styled(motion.div)`
  background-color: ${ ({ theme }) => theme.colors.white1 };
  max-width: 100%;
  min-height: 100vh;
  margin-left: auto;
  position: relative;
  width: 100vw;

  &::after {
    content: "";
    background-color: ${ ({ theme }) =>theme.colors.white1 };
    height: 100%;
    inset: 0 -${ rem(16) } auto auto;
    position: absolute;
    width: ${ rem(32) };
  }

  ${ breakpoint("tablet", `
    max-width: ${ rem(560) };
  `) }
`

export const VersionContentContainer = styled.div`
  overflow: hidden;
  padding: ${ rem(32) } 0 0;
  position: relative;
`

export const VersionClose = styled.button`
  background: url("/icons/icon-hamburger-dark-close.svg") no-repeat center center;
  background-color: ${ ({ theme }) => theme.colors.white1 };
  border-radius: ${ rem(8) } 0 0 ${ rem(8) };
  height: ${ rem(40) };
  inset: ${ rem(64) } auto auto -${ rem(40) };
  position: absolute;
  transform: translateX(1px);
  width: ${ rem(40) };
`

export const VersionsList = styled.ul`
  display: flex;
  margin: 0 auto ${ rem(32) };
  max-width: max-content;
`

type VersionsListItemProps = {
  completed?: boolean
}

export const VersionsListItem = styled.li<VersionsListItemProps>`
  border-radius: 50%;
  display: grid;  
  font-size: ${ rem(13) };
  font-weight: 600;
  height: ${ rem(20) };
  place-content: center;
  width: ${ rem(20) };  

  &:not(:last-of-type) {
    margin-right: ${ rem(12) };
  }

  ${ ({ theme: { colors }, completed }) => `
    background-color: ${ completed? colors.darkBlue : colors.grey3 };
    color: ${ colors.white1 };
  ` }
`

export const VersionStoryRequestContainer = styled.div`
  border-bottom: 1px solid ${ ({ theme }) => theme.colors.grey3 };
  display: grid;
  gap: ${ rem(16) } 0;
  padding: 0 ${ fluid(16, 3, 32) } ${ rem(24) };
`

export const TopicsListItemHeading = styled.p`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ rem(14) };
  font-weight: 600;
`

export const TopicsListItemInformation = styled(DefaultText)`
  white-space: pre-wrap;
`

type TopicsListItemProps = {
  column?: boolean
}

export const TopicsListItem = styled.li<TopicsListItemProps>`
  display: flex;

  ${ TopicsListItemHeading } {
    margin: 0 ${ rem(4) } 0 0;
  }

  ${ ({ column }) => {
    switch(column) {
      case true:
        return css`
          flex-direction: column;
      
          ${ TopicsListItemHeading } {
            margin: 0 0 ${ rem(2) } 0;
          }
        `
    }
  } }
`