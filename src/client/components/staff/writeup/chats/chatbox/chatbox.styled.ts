import styled, { css } from "styled-components"
import { rem } from "@/styled/functions"
import { motion } from "framer-motion"


export const ChatMessage = styled.div`
  border-radius: ${ rem(24) };
  font-size: ${ rem(14) };
  line-height: 1.4;
  max-width: max-content;
  padding: ${ rem(8) } ${ rem(12) };
  pre-wrap: wrap;
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
  max-width: ${ rem(240) };

  ${ ({ $owned, $start, theme: { colors } }) => {
    if ( $owned ) {
      return css`
        margin-left: auto;
        ${ $start? css`margin-bottom: ${ rem(4) }` : css`` };

        ${ ChatOwner } {
          display: none;
        }

        ${ ChatMessage } {
          background-color: ${ colors.blue };
          color: ${ colors.white1 };
          margin-left: auto;
        }
      `
    }
  } }

  ${ ({ $owned, $start, $end }) => {
    if ( $start ) {
      return css`

        ${ ChatMessage } {
          border-bottom-right-radius: ${ $owned? css`${ rem(2) }` : css`0` };
        }
      `
    }

    if ( $end ) {
      return css`

        ${ ChatMessage } {
          border-top-right-radius: ${ $owned? css`${ rem(2) }` : css`0` };
        }
      `
    }
  } }

  ${ ({ $owned, $middle }) => {
    console.log($middle)
    if ( $middle ) {
      return css`
        
        ${ ChatMessage } {
          border-radius: ${ $owned? css` ${ rem(24) } ${ rem(2) } ${ rem(2) } ${ rem(24) } ` : css`${ rem(2) } ${ rem(24) } ${ rem(24) } ${ rem(2) }` };
        }
      `
    }
  } }
`

export const ChatsContainer = styled.div`
  max-height: 100%;
  overflow: hidden scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
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
  border-radius: ${ rem(24) };
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
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const ChatboxWrapper = styled(motion.div)`
  border-radius: ${ rem(8) } ${ rem(8) } 0 0;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .10);
  display: grid;
  gap: ${ rem(12) } 0;
  grid-template-rows: 1fr ${ rem(38) };
  height: 100vh;
  inset: auto ${ rem(64) } 0 auto;
  max-width: ${ rem(320) };
  max-height: ${ rem(432) };
  padding: ${ rem(16) };
  position: absolute;
  width: 100vw;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey4 };
  ` }
`