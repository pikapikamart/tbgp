import { RenderElements } from "@/components/staff/writeup/write/slate/element"
import { RenderLeaves } from "@/components/staff/writeup/write/slate/leaf"
import { 
  withImages, 
  withInlines } from "@/components/staff/writeup/write/slate/utils"
import { 
  useAppDispatch, 
  useViewArticle } from "@/lib/hooks/store.hooks"
import { 
  FullArticle, 
  resetViewingArticle } from "@/store/slices/articles.slice"
import { 
  useCallback,
  useEffect, 
  useMemo, 
  useRef, 
  useState } from "react"
import { 
  createEditor, 
  Editor } from "slate"
import { withHistory } from "slate-history"
import { 
  RenderElementProps, 
  RenderLeafProps, 
  withReact } from "slate-react"
import FingerPrintjs from "@fingerprintjs/fingerprintjs"
import { trpc } from "@/lib/trpc"


export const useArticle = () =>{
  const [ showToast, setShowToast ] = useState(false)
  const article = useViewArticle()
  const clipboard = useRef<HTMLInputElement | null>(null)
  const url = useRef("")
  const mutation = trpc.useMutation(["article.view"])
  
  const handleCopyLink = () =>{

    if ( !clipboard.current ) {
      return
    }

    setShowToast(true)

    clipboard.current?.select()
    clipboard.current?.setSelectionRange(0, 9000)
    navigator.clipboard.writeText(clipboard.current?.value)
  }

  useEffect(() =>{
    if ( showToast ) {
      const timeout = setTimeout(() =>{
        setShowToast(false)
      }, 700)
      
      return () => clearTimeout(timeout) 
    }
  }, [ showToast ])

  useEffect(() =>{
    if ( typeof window !==undefined ) {
      url.current = window.location.href
    }
  }, [])

  useEffect(() =>{
    if ( article?.linkPath ) {
      const fpPromise = FingerPrintjs.load()
  
      const sendView = async() => {
        const fp = await fpPromise
        const result = await fp.get()
  
        mutation.mutate({
          linkPath: article?.linkPath?? "link",
          fingerprint: result.visitorId
        })
      }
  
      sendView()
    }
  }, [ article?.linkPath ])

  return {
    article,
    url: url.current,
    showToast,
    clipboard,
    handleCopyLink,
  }
}

export const useArticleSlate = ( article: FullArticle | null  ) =>{
  const editorRef = useRef<Editor>()
  const dispatch = useAppDispatch()

  if ( !editorRef.current ) {
    editorRef.current = withImages(withInlines(withHistory(withReact(createEditor()))))
  }

  const editor = editorRef.current

  const initialValue = useMemo(() =>{
    return article?.content
  }, [ article?.content ])

  const renderElement = useCallback((props: RenderElementProps) => {
    return <RenderElements {...props} />
  }, [])

  const renderLeaf = useCallback(( props: RenderLeafProps ) => {
    return <RenderLeaves { ...props } />
  }, [])

  useEffect(() =>{
    return () => {
      dispatch(resetViewingArticle())
    }
  }, [])

  return {
    editor,
    initialValue,
    renderElement,
    renderLeaf
  }
}