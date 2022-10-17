import { useSetupStaff } from "@/lib/hooks/store.hooks"


type AuthguardProps = {
  children: React.ReactNode
}

const Authguard = ({ children }: AuthguardProps) =>{
  const { staff } = useSetupStaff()

  if ( !staff.username ) {
    return <></>
  }

  return(
    <>
      { children }
    </>
  )
}


export default Authguard