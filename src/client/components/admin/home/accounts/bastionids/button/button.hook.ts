import { 
  useEffect, 
  useState } from "react"


export const useCopyBastionId = () =>{
  const [ showCopied, setShowCopied ] = useState(false)

  const handleCopy = () =>{
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
    handleCopy
  }
}