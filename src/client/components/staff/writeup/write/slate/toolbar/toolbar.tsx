import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { isCollaborativePartDone, isWriteupHandler, isWriteupReadonly } from "../../../utils"
import { ToolbarMarkButton } from "./button"
import { ToolbarBlockButton } from "./button/block"
import { ToolbarHeadingList } from "./heading"
import { ToolbarImage } from "./image"
import { ToolbarLink } from "./link"
import { ToolbarWrapper } from "./toolbar.styled"


const ToolBar = () => {
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()

  return (
    <ToolbarWrapper ref={ el => isWriteupReadonly(writeup, staff.bastionId) || isCollaborativePartDone(writeup, staff.bastionId) ? el?.setAttribute("inert", "true") : el?.removeAttribute("inert") }>
      <ToolbarBlockButton
        text="P"
        format="paragraph"
        label="transform to paragraph" />
      <ToolbarHeadingList />
      <ToolbarMarkButton
        text="B"
        format="bold"
        label="transform text bold"
        decoration="bold" />
      <ToolbarMarkButton
        text="I"
        format="italic"
        label="transform text to italic"
        decoration="italic" />
      <ToolbarMarkButton
        text="U"
        format="underline"
        label="transform text to underline"
        decoration="underline" />
      <ToolbarLink />
      { writeup.content[0].phase==="graphics" && isWriteupHandler(writeup, staff.bastionId) && <ToolbarImage /> }      
    </ToolbarWrapper>
  )
}


export default ToolBar