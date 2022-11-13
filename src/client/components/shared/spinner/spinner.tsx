import { useEffect } from "react"
import { 
  SpinnerInner, 
  SpinnerWrapper } from "./spinner.styled"


const Spinner = () =>{

  useEffect(() =>{
    const cancelKeyboard = ( event: KeyboardEvent ) => {
      event.preventDefault()
    }

    document.body.addEventListener("keydown", cancelKeyboard)

    return () => document.body.removeEventListener("keydown", cancelKeyboard)
  }, [])

  return (
    <SpinnerWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <SpinnerInner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SpinnerInner>
    </SpinnerWrapper>
  )
}


export default Spinner