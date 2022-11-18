import styled, { css } from "styled-components"
import { breakpoint, rem } from "@/styled/functions"
import { motion } from "framer-motion"


export const ChatMessage = styled.div`
  background-color: #E5E4FF;
  border-radius: ${ rem(64) };
  font-size: ${ rem(14) };
  line-height: 1.4;
  max-width: max-content;
  padding: ${ rem(8) } ${ rem(16) };
  white-space: pre-wrap;
`

export const ChatOwner = styled.p`
  color: ${({ theme }) => theme.colors.dark3 };
  font-size: ${ rem(13) };
  font-weight: 600;
  margin-bottom: ${ rem(4) };
  padding-left: ${ rem(12) };
`

type SingleChatProps = {
  $owned: boolean,
  $start: boolean,
  $middle: boolean,
  $end: boolean
}

export const SingleChat = styled.div<SingleChatProps>`
  margin-bottom: ${ rem(12) };
  max-width: ${ rem(272) };

  ${ ({ $start, $middle, $end }) => {
    if ( $start ) {
      return css`
        margin-bottom: ${ rem(4) };

        ${ ChatMessage } {
          border-bottom-left-radius: ${ rem(2) };
        }
      `
    }

    if ( $middle ) {
      return css`
        margin-bottom: ${ rem(4) };

        ${ ChatOwner } {
          display: none;
        }

        ${ ChatMessage } {
          border-radius: ${ rem(2) } ${ rem(32) } ${ rem(32) } ${ rem(2) };
        }
      `
    }
    
    if ( $end ) {
      return css`

        ${ ChatOwner } {
          display: none;
        }

        ${ ChatMessage } {
          border-top-left-radius: ${ rem(2) };
        }
      `
    }
  } }

  ${ ({ $owned, $start, $middle, $end, theme: { colors } }) => {
  
    if ( $owned) {
      return css`
        margin-left: auto;

        ${ ChatOwner } {
          display: none;
        }

        ${ ChatMessage } {
          background-color: ${ colors.blue };
          color: ${ colors.white1 };
          margin-left: auto;

          ${ $start && css`
            border-radius: ${ rem(32) } ${ rem(32) } ${ rem(2) } ${ rem(32) };
          ` }

          ${ $middle && css`
            border-radius: ${ rem(32) } ${ rem(2) } ${ rem(2) } ${ rem(32) };
          ` }

          ${ $end && css`
            border-radius: ${ rem(32) } ${ rem(2) } ${ rem(32) } ${ rem(32) };
          ` }
        }
      `
    }
  } }


  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ChatsContainer = styled.div`
  margin-bottom: ${ rem(12) };
  max-height: 100%;
  overflow: hidden scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  
  ${ breakpoint("tablet", `
    margin-bottom: 0;
  `) }
`

export const ChatboxSend = styled.button`
  background: white url("/icons/icon-chat-send.svg") no-repeat center center;
  border-radius: 50%;
  height: ${ rem(32) };
  margin-left: ${ rem(4) };
  width: ${ rem(32) };
`

export const ChatboxCompose = styled.textarea`
  align-items: center;
  align-self: end;
  border-radius: ${ rem(32) };
  display: flex;
  flex-basis: ${ rem(252) };
  font-size: ${ rem(14) };
  height: 100%;
  line-height: 1.4;
  max-height: ${ rem(96) };
  padding: ${ rem(10) } ${ rem(16) };
  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;

  &:focus-visible {
    outline: none;
  }

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white3 };
    border: 1px solid ${ colors.white4 };
    color: ${ colors.dark2 };
  ` }
`

export const ChatboxComposeContainer = styled.div`
  align-self: end;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr ${ rem(32) };
  justify-content: space-between;
`

export const ChatboxMobileExit = styled.button`
  border-radius: 0 0 ${ rem(24) } ${ rem(24) };
  margin: 0 auto;
  position: relative;
  width: 50%;

  &::before,
  &::after {
    content: "";
    background-color: rgba(0, 0, 0, .35);
    border-radius: ${ rem(8) };
    height: 2px;
    inset: 40% auto auto 50%;
    position: absolute;
    transform: translateX(-50%);
    width: ${ rem(32) };
  }

  &::after {
    top: 60%;
  }

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey3 };
    border-top: none;
  ` }

  ${ breakpoint("tablet", `
    display: none;
  `) }
`

export const ChatboxWrapper = styled(motion.div)`
  border-radius: ${ rem(8) } ${ rem(8) } 0 0;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .10);
  display: grid;
  grid-template-rows: ${ rem(24) } 1fr ${ rem(38) };
  height: 100vh;
  inset: auto 0 0 auto;
  max-height: ${ rem(432) };
  padding:  0 ${ rem(16) } ${ rem(16) };
  position: fixed;
  width: 100%;

  ${ breakpoint("tablet", `
    inset: auto ${ rem(64) } 0 auto;
    gap: ${ rem(12) } 0;
    grid-template-rows: 1fr ${ rem(38) };
    max-width: ${ rem(320) };
    padding: ${ rem(16) };
    position: absolute;
    width: 100vw;
  `) }

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey4 };
  ` }
`