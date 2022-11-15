import { useExpansion } from "@/lib/hooks"
import { useRouter } from "next/router"
import { 
  useEffect, 
  useRef, 
  useState} from "react"


export const useHeader = () => {
  const { isExpanded, handleExpansion } = useExpansion()
  const router = useRouter()
  const isMounted = useRef(false)

  useEffect(() =>{
    if ( isMounted && isExpanded ){
      handleExpansion()
    } else {
      isMounted.current = true
    }
  }, [ router.pathname ])

  return {
    isExpanded,
    handleExpansion
  }
}

export const useHeaderAnimation = () => {
  const [ showHeaderSticky, setShowHeaderSticky ] = useState(false);
  const [ hideHeaderSticky, setHideHeaderSticky ] = useState(false);
  const [ windowHeight, setWindowHeight ] = useState(0);
  const router = useRouter()

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
    if ( !router.pathname.includes("writeup") &&  !hideHeaderSticky && windowHeight > 600 ) {
      setShowHeaderSticky(true);
    }

    else if ( showHeaderSticky && windowHeight <= 600 ) {
      setHideHeaderSticky(true);
    }
  }, [ windowHeight ]);

  useEffect(() =>{
    const handleHeightResize = () =>{
      setWindowHeight(window.scrollY);
    }

    window.addEventListener("scroll", handleHeightResize)

    return () => {
      window.removeEventListener("scroll", handleHeightResize)
    }
  }, [])

  return {
    showHeaderSticky,
    hideHeaderSticky
  }
}