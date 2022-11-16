import { 
  CustomElement,
  CustomElementType,
  Editor,
  Element, 
  ImageElement, 
  LinkElement, 
  Node, 
  Range,
  Transforms} from "slate";
import isUrl from "is-url"
import isKeyHotkey from "is-hotkey"


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

export const isLinkActive = ( editor: Editor ) => {
  const [ link ] = Array.from(Editor.nodes(editor, {
    match: n => 
      !Editor.isEditor(n) &&
       Element.isElement(n) &&
       n.type==="link" 
  }))

  return !!link
}

const unwrapLink = ( editor: Editor ) => {
  Transforms.unwrapNodes(editor, {
    match: n => 
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      n.type==="link"
  })
}

const wrapLink = ( editor: Editor, url: string ) => {
  if ( isLinkActive(editor) ) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: "link",
    url,
    children: isCollapsed? [{text: url}] : []
  }

  if ( isCollapsed ) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: "end" })
  }
}

export const insertLink = ( editor: Editor, url: string ) => {
  if ( editor.selection ) {
    wrapLink(editor, url)
  }
}

export const createImageNode = (url: string, caption: string): ImageElement => ({
  type: "image",
  url,
  caption,
  children: [{ text: "" }]
});

export const insertImage = ( editor: Editor, url: string, caption: string ) => {
  if ( !url ) {
    return
  }

  const { selection } = editor
  const image = createImageNode(url, caption)

  if ( !!selection ) {
    const [ parentNode, parentPath ] = Editor.parent(
      editor,
      selection.focus?.path
    )

    if ( editor.isVoid(parentNode as CustomElement) || Node.string(parentNode).length ) {
      Transforms.insertNodes(editor, image)
    } else {
      Transforms.removeNodes(editor, { at: parentPath });
      Transforms.insertNodes(editor, image);
    }
  } else {
    Transforms.insertNodes(editor, image);
  }
}

export const isLinkElement = ( element: CustomElement ): element is LinkElement => {
  return ( element as LinkElement )?.url!==undefined
}

export const withInlines = ( editor: Editor ) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element =>
    ['link', 'button'].includes(element.type) || isInline(element)

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const withImages = ( editor: Editor ) => {
  const { isVoid } = editor

  editor.isVoid = ( element ) => {
    return element.type==="image" ? true : isVoid(element)
  }

  return editor
}

export const slateKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, editor: Editor ) => {
  const { selection } = editor

  if ( !selection ) {
    return 
  }

  const { nativeEvent } = event

  if (Range.isCollapsed(selection)) {
    if (isKeyHotkey('left', nativeEvent)) {
      event.preventDefault()
      Transforms.move(editor, { unit: 'offset', reverse: true })
      return
    }
    if (isKeyHotkey('right', nativeEvent)) {
      event.preventDefault()
      Transforms.move(editor, { unit: 'offset' })
      return
    }
  }

  const markRunner = (slateFunc: ( editor: Editor, format: string ) => void, format: string) =>{
    slateFunc(editor, format)
    event.preventDefault()
  }

  const blockRunner = ( slateFunc: ( editor: Editor, format: CustomElementType ) => void, format: CustomElementType ) => {
    slateFunc(editor, format)
    event.preventDefault()
  }

  if ( nativeEvent.ctrlKey ) {
   
    switch(nativeEvent.key) {
      case "b":
        return markRunner(toggleMark, "bold")
      case "i":
        return markRunner(toggleMark, "italic")
      case "u":
        return markRunner(toggleMark, "underline")
      case "2":
        return blockRunner(toggleBlock, "heading-two")
      case "3":
        return  blockRunner(toggleBlock, "heading-three")
      case "4":
        return  blockRunner(toggleBlock, "heading-four")
      case "p":
        return blockRunner(toggleBlock, "paragraph")
    }
  }
}
