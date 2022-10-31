import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { ToolbarMarkButton } from "./button"
import { ToolbarBlockButton } from "./button/block"
import { ToolbarHeadingList } from "./heading"
import { ToolbarLink } from "./link"
import { ToolbarWrapper } from "./toolbar.styled"


const ToolBar = () => {
  const writeup = useSelectWriteup()

  return (
    <ToolbarWrapper>
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
    </ToolbarWrapper>
  )
}


export default ToolBar