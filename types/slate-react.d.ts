// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'


export type FormattedText = {
  [ key: string ]: any,
  text: string,
  bold?: boolean,
  italic?: boolean
}

export type CustomText = FormattedText

export type ParagraphElement = {
  type: "paragraph",
  children: CustomText[]
}

export type HeadingElement = {
  type: "heading",
  level: number,
  children: CustomText[]
}

export type CodeElement = {
  type: "code",
  children: CustomText[]
}

type CustomElement = ParagraphElement | HeadingElement | CodeElement

declare module 'slate' {
  export interface BaseElement {
    type: string
  }
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}