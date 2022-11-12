import { DefaultLayout } from "@/components/layout/default";
import { Writer } from "@/components/main/writer";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet-async";
import { NextPageWithLayout } from "../_app";


const processUsername = ( username: string ) => {
  const processed = username
    .split(".")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .reverse()
    .join(" ")
  
  return processed
}

const UsernamePage: NextPageWithLayout = () =>{
  const router = useRouter()

  return (
    <>
      <Helmet>
        <title>{ `${ processUsername(router.query["username"] as string) }` } | TBGP</title>
      </Helmet>
      <Writer />
    </>
  )
}

UsernamePage.getLayout = page => DefaultLayout(page)


export default UsernamePage