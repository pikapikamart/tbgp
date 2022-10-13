import { 
  useState,
  useRef } from "react"


export const useTablistSelection = () => {
  const [ currentTabindex, setCurrentTabindex ] = useState(0)
  const tabsRefs = useRef<HTMLButtonElement[]>([])
  const currentFocusIndexRef = useRef(0)
  const tablistContentRef = useRef<HTMLDivElement | null>(null)

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
      setCurrentTabindex(parseInt(dataset.index))
    }
  }

  return {
    currentTabindex,
    addTabRef,
    handleChangeTabFocus,
    handleChangeCurrentTabindex
  }
}