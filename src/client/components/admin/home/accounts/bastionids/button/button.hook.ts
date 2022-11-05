import { 
  useEffect, 
  useRef, 
  useState } from "react"


export const useCopyBastionId = () =>{
  const [ showCopied, setShowCopied ] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleCopy = () =>{
    if ( !inputRef.current ) {
      return
    }

    inputRef.current.select()
    inputRef.current.setSelectionRange(0, 9000)
    navigator.clipboard.writeText(inputRef.current.value)
    setShowCopied(true)
  }

  useEffect(() =>{
    if ( showCopied ) {
      const timeout = setTimeout(() =>{
        setShowCopied(false)
      }, 760)

      return () => clearTimeout(timeout)
    }
  }, [ showCopied ])

  return {
    showCopied,
    inputRef,
    handleCopy
  }
}