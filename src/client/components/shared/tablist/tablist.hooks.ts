import { useRouter } from "next/router"
import { 
  useState,
  useRef, 
  useEffect} from "react"
import { ParamsPath } from "./tablist"


export const useTablistSelection = ( paramsPaths : ParamsPath[], isRouting: boolean = true ) => {
  const [ currentTabindex, setCurrentTabindex ] = useState(0)
  const tabsRefs = useRef<HTMLButtonElement[]>([])
  const currentFocusIndexRef = useRef(0)
  const router = useRouter()

  const addTabRef = ( element: HTMLButtonElement | null ) => {
    if ( element && !tabsRefs.current.includes(element) ) {
      tabsRefs.current.push(element)
    }
  }

  const handleChangeTabFocus = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
    const { key } = event
    const tabsLength = tabsRefs.current.length

    switch(key) {
      case "ArrowRight":
        currentFocusIndexRef.current = ++currentFocusIndexRef.current===tabsLength? 0: currentFocusIndexRef.current
        tabsRefs.current[currentFocusIndexRef.current].focus()  

        return
      case "ArrowLeft":
        currentFocusIndexRef.current = --currentFocusIndexRef.current===-1? tabsLength-1: currentFocusIndexRef.current
        tabsRefs.current[currentFocusIndexRef.current].focus()  

        return
      case "ArrowUp":
      case "ArrowDown":
    }
  }

  const handleChangeCurrentTabindex = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    const { dataset } = event.currentTarget
    
    if ( dataset.index && parseInt(dataset.index)!==currentTabindex ) {
      const dataIndex = parseInt(dataset.index)
      setCurrentTabindex(dataIndex)

      if ( isRouting ) {
        if ( paramsPaths[dataIndex].query ) {
          router.replace(router.pathname + `?tab=${ paramsPaths[dataIndex].query }`)
        } else {
          router.replace(router.pathname.split("?")[0])
        }
      }
    }
  }

  useEffect(() =>{
    if ( router.query["tab"] ) {
      const tabIndex = paramsPaths.findIndex(params => params.query===router.query["tab"])

      if ( tabIndex!==-1 ) {
        setCurrentTabindex(tabIndex)
      }
    } else {
      setCurrentTabindex(0)
    }
  }, [ router.query ])

  return {
    currentTabindex,
    addTabRef,
    handleChangeTabFocus,
    handleChangeCurrentTabindex,
    query: router.query["tab"]
  }
}