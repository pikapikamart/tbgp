import { InitialWriteup } from "@/components/shared/writeup/initial"
import { WriteupPhases } from "@/src/server/models/writeup.model"
import { useInitialWriteups } from "./tabContent.hook"
import { InitialWriteupsList } from "./tabContent.styled"


type TabContentProps = {
  tab: WriteupPhases
}

const TabContent = ({ tab }: TabContentProps) =>{
  const initialWriteup = useInitialWriteups(tab)

  return (
    <InitialWriteupsList>
      { initialWriteup.map(writeup => (
        <InitialWriteup 
          key={ writeup.writeupId }
          writeup={ writeup } />
      )) }
    </InitialWriteupsList>
  )
}


export default TabContent