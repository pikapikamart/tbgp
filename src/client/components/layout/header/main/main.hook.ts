import { useEffect, useState } from "react"


export const useMainHeader = () =>{
  const [ showDesktopItems, setShowDesktopItems ] = useState(false)

  useEffect(() =>{
    const handleResize = () => changeState()

    const changeState = () =>{
      if ( window.innerWidth >= 1000 ) {
        setShowDesktopItems(true)
      } else if ( window.innerWidth <= 999 ) {
        setShowDesktopItems(false)
      }
    }

    changeState()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {
    showDesktopItems
  }
}