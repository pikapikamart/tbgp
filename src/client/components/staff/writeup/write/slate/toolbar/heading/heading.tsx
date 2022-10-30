import { useExpansion } from "@/lib/hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { ToolbarBlockButton } from "../button/block"
import { 
  HeadingListWrapper,
  HeadingMarkTrigger,
  ToolbarItem } from "../toolbar.styled"


const Heading = () =>{
  const { isExpanded, handleExpansion } = useExpansion()

  return (
    <ToolbarItem>
      <HeadingMarkTrigger
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
          <SrOnly>Headings selection</SrOnly>
        H
      </HeadingMarkTrigger>
      { isExpanded && (
        <HeadingListWrapper>
          <ToolbarBlockButton
            text="H"
            label="transform to heading 2"
            format="heading-two"
            extraChild={ <span>2</span> } />
          <ToolbarBlockButton
            text="H"
            label="transform to heading 3"
            format="heading-three"
            extraChild={ <span>3</span> } />
          <ToolbarBlockButton
            text="H"
            label="transform to heading 4"
            format="heading-four"
            extraChild={ <span>4</span> } />
        </HeadingListWrapper>
      ) }
    </ToolbarItem>
  )
}


export default Heading