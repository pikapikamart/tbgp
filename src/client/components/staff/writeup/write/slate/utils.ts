import { Editor } from "slate";


export const isMarkActive = ( editor: Editor, format: string ) => {
  const marks = Editor.marks(editor)

  return marks? marks[format]===true : false
}

export const toggleMark = ( editor: Editor, format: string ) => {
  const isActive = isMarkActive(editor, format)

  isActive? Editor.removeMark(editor, format) : Editor.addMark(editor, format, true)
}