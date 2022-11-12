import { useEffect, useState } from "react"


export const useMainHeader = () =>{
  const [ showDesktopItems, setShowDesktopItems ] = useState(false)
  const [ showHeaderSticky, setShowHeaderSticky ] = useState(false);
  const [ hideHeaderSticky, setHideHeaderSticky ] = useState(false);
  const [ windowHeight, setWindowHeight ] = useState(0);

  useEffect(() =>{
    if ( hideHeaderSticky ) {
      const stickyTimeout = setTimeout(() => {
        setHideHeaderSticky(false);
        setShowHeaderSticky(false);
      }, 500);

      return () => clearTimeout(stickyTimeout);
    }
  }, [ hideHeaderSticky ]);

  useEffect(() =>{
    if ( !hideHeaderSticky && windowHeight > 650 ) {
      setShowHeaderSticky(true);
    }

    else if ( showHeaderSticky && windowHeight <= 650 ) {
      setHideHeaderSticky(true);
    }
  }, [ windowHeight ]);

  useEffect(() =>{
    const handleResize = () => changeState()

    const changeState = () =>{
      if ( window.innerWidth >= 1000 ) {
        setShowDesktopItems(true)
      } else if ( window.innerWidth <= 999 ) {
        setShowDesktopItems(false)
      }
    }

    const handleHeightResize = () =>{
      setWindowHeight(window.scrollY);
    }

    changeState()

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleHeightResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleHeightResize)
    }
  }, [])
  console.log(showHeaderSticky, hideHeaderSticky)
  return {
    showDesktopItems,
    showHeaderSticky,
    hideHeaderSticky
  }
}