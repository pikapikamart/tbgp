import { useExpansion } from "@/lib/hooks"
import { 
  useRef,
  useState,
  useEffect } from "react"
import { rolesData } from "./data"


type UsePositionComboBoxProps = ( position: string ) => void

export const usePositionComboBox = ( handleSetPosition : UsePositionComboBoxProps) =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const comboBoxRef = useRef<HTMLButtonElement | null>(null)
  const listBoxRef = useRef<HTMLDivElement | null>(null)
  const listItemsArrayRef = useRef<HTMLDivElement[]>([])
  const [ selectedIndex, setSelectedIndex ] = useState<number | null>(null)
  const [ traversingIndex, setTraversingIndex ] = useState(0)

  const addListOptionsRef = ( element: HTMLDivElement | null ) => {
    if( element && !listItemsArrayRef.current.includes(element) ) {
      listItemsArrayRef.current.push(element)
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

    const role = rolesData[optionIndex]
    comboBoxRef.current.textContent = rolesData[optionIndex].name
    setSelectedIndex(optionIndex)
    handleSetPosition(role.value)
    handleExpansion()
 
    setTimeout(() =>{
      comboBoxRef.current?.focus()
    }, 100)
  }


  const handleListboxTraversing = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
    const { key } = event
    const arrayLength = rolesData.length

    if ( !comboBoxRef.current ) {
      return
    }

    switch(key) {
      case "ArrowLeft":
      case "ArrowUp":
        setTraversingIndex(prev => prev-1===-1? arrayLength-1 : prev-1)  

        return
      case "ArrowRight":
      case "ArrowDown":
        setTraversingIndex(prev => prev+1===arrayLength? 0 : prev+1)  

        return
      case "Enter":
        setSelectedIndex(traversingIndex)
        handleOptionSelection(traversingIndex)
    }
  }

  useEffect(() =>{
    if ( comboBoxRef.current ) {
      if ( isExpanded ) {
        comboBoxRef.current.setAttribute("aria-activedescendant", rolesData[traversingIndex].value)
        listItemsArrayRef.current.map(el => el.classList.remove("selected"))
        listItemsArrayRef.current[traversingIndex].classList.add("selected")
      } else {
        comboBoxRef.current.removeAttribute("aria-activedescendant")
      }
    }
  }, [ traversingIndex, isExpanded ])

  return {
    isExpanded,
    comboBoxRef,
    listBoxRef,
    selectedIndex,
    handleOptionSelection,
    handleListboxExpansion,
    addListOptionsRef,
    handleListboxTraversing
  }
}