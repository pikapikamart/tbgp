import { Verification } from "@/src/server/models/admin.model";
import { 
  createContext, 
  useState } from "react";
import Home from "./home";


export type VerificationContext = Verification & {
  type: "accept" | "reject"
}

export type AdminContextProps = {
  verification: VerificationContext | null,
  addVerification: ( verification: VerificationContext ) => void,
  removeVerification: () => void
}

export const AdminContext = createContext<AdminContextProps | null>(null)

type AdminProviderProps = {
  children: React.ReactNode
}

const AdminProvider = ( { children }: AdminProviderProps ) =>{
  const [ verification, setVerification ] = useState<VerificationContext | null>(null)
  
  const addVerification = ( verification: VerificationContext ) => {
    setVerification(verification)
  }

  const removeVerification = () => {
    setVerification(null)
  }

  return (
    <AdminContext.Provider value={{ verification, addVerification, removeVerification }}>
      { children }
    </AdminContext.Provider>
  )
}


export default () => {
  
  return (
    <AdminProvider>
      <Home />
    </AdminProvider>
  )
};