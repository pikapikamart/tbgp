import { InitialWriteup } from "@/components/shared/writeup/initial"
import { InitialWriteupsList } from "@/components/staff/activities/writeups/tabContent/tabContent.styled"
import { PopulatedInitialWriteup } from "@/store/store.types"

type TabContentProps = {
  writeups: PopulatedInitialWriteup[]
}

const TabContent = ({ writeups }: TabContentProps) =>{
  
  return (
    <InitialWriteupsList>
      { writeups?.map(writeup => writeup && (
        <InitialWriteup
          key={ writeup.writeupId }
          writeup={ writeup } />
      )) }
    </InitialWriteupsList>
  )
}


export default TabContent