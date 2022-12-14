import { 
  BaseEditor, 
  Descendant } from 'slate'
import { ReactEditor } from 'slate-react'


declare module 'slate' {
  export type FormattedText = {
    [ key: string ]: any,
    text: string,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean
  }
  
  export type CustomText = FormattedText
  
  export type ParagraphElement = {
    type: "paragraph",
    children: CustomText[]
  }
  
  export type HeadingTwoElement = {
    type: "heading-two",
    children: CustomText[]
  }

  export type HeadingThreeElement = {
    type: "heading-three",
    children: CustomText[]
  }

  export type HeadingFourElement = {
    type: "heading-four",
    children: CustomText[]
  }

  export type ImageElement = {
    type: "image",
    url: string,
    caption: string,
    children: CustomText[]
  }

  export type LinkElement = {
    type: "link",
    url: string,
    children: CustomText[]
  }

  export interface BaseElement {
    type: string
  }

  export type HeadingFormat = {
    type: string,
    level: number
  }
  
  export type CustomElement = 
  ParagraphElement | 
  HeadingTwoElement |
  HeadingThreeElement |
  HeadingFourElement |
  LinkElement |
  ImageElement
  
  export type CustomElementType = CustomElement["type"] 

  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}