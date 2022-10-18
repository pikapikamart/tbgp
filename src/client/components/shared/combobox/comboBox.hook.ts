import { useExpansion } from "@/lib/hooks"
import { 
  useRef,
  useState,
  useEffect } from "react"



export const useComboBox = ( ) =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const [ selectedIndex, setSelectedIndex ] = useState<number | null>(null)
  const [ traversingIndex, setTraversingIndex ] = useState(0)
  const comboBoxRef = useRef<HTMLButtonElement | null>(null)
  const listBoxRef = useRef<HTMLDivElement | null>(null)
  const listBoxOptions = useRef<HTMLDivElement[]>([])

  const addListOptionsRef = ( element: HTMLDivElement | null ) => {
    if( element && !listBoxOptions.current.includes(element) ) {
      listBoxOptions.current.push(element)
    }
  }

  const handleListboxExpansion = () =>{
    handleExpansion()
    
    setTimeout(() =>{
      listBoxRef.current?.focus()
    }, 10)
  }

  const handleOptionSelection = ( optionIndex: number ) => {

    if ( !comboBoxRef.current ) {
      return 
    }

    setSelectedIndex(optionIndex)
    setTraversingIndex(optionIndex)
    handleExpansion()
 
    setTimeout(() =>{
      comboBoxRef.current?.focus()
    }, 100)
  }


  const handleListboxTraversing = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
    const { key } = event
    const optionsLength = listBoxOptions.current.length

    if ( !comboBoxRef.current ) {
      return
    }

    switch(key) {
      case "ArrowLeft":
      case "ArrowUp":
        setTraversingIndex(prev => prev-1===-1? optionsLength-1 : prev-1)  

        return
      case "ArrowRight":
      case "ArrowDown":
        setTraversingIndex(prev => prev+1===optionsLength? 0 : prev+1)  

        return
      case "Enter":
        setSelectedIndex(traversingIndex)
        handleOptionSelection(traversingIndex)
    }
  }

  useEffect(() =>{
    if ( isExpanded ) {
      listBoxOptions.current.map(el => el.classList.remove("selected"))
      listBoxOptions.current[traversingIndex].classList.add("selected")
    } 
  }, [ traversingIndex, isExpanded ])

  return {
    isExpanded,
    comboBoxRef,
    listBoxRef,
    selectedIndex,
    traversingIndex,
    handleOptionSelection,
    handleListboxExpansion,
    addListOptionsRef,
    handleListboxTraversing
  }
}