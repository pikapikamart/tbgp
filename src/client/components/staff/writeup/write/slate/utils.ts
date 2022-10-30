import { 
  CustomElementType,
  Editor,
  Element, 
  Transforms} from "slate";


export const isMarkActive = ( editor: Editor, format: string ) => {
  const marks = Editor.marks(editor)

  return marks? marks[format]===true : false
}

export const toggleMark = ( editor: Editor, format: string ) => {
  const isActive = isMarkActive(editor, format)

  isActive? Editor.removeMark(editor, format) : Editor.addMark(editor, format, true)
}

export const isBlockActive = ( editor: Editor, format: string ) => {
  const { selection } = editor

  if ( !selection ) {
    return false
  }

  const [ match ] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => 
        !Editor.isEditor(n) &&
        Element.isElement(n) && 
        n["type"]===format
    })
  )

  return !!match
}

export const toggleBlock = ( editor: Editor, format: CustomElementType ) => {
  const isActive = isBlockActive(editor, format)

  const newProperties: Partial<Element> = {
    type: isActive? "paragraph" : format
  }
 
  Transforms.setNodes<Element>(editor, newProperties, {match: n => Editor.isBlock(editor, n)})
}