import { DefaultLayout } from "@/components/layout/default";
import { Writer } from "@/components/main/writer";
import { NextPageWithLayout } from "../_app";


const UsernamePage: NextPageWithLayout = () =>{

  return (
    <Writer />
  )
}

UsernamePage.getLayout = page => DefaultLayout(page)


export default UsernamePage