import { trpc } from "@/lib/trpc"
import Link from "next/link"
import { NavlinksListItem } from "./navlinks.styled"


export const useNavlinks = () =>{
  const query = trpc.useQuery(["categories.get-all"])
 
  const renderLinks = () =>{
    if ( query.isSuccess ) {
      const categories = query.data.data.map(category => (
        <NavlinksListItem key={ category }>
          <Link
            href={"/readings/" + category.toLowerCase()}
            passHref>
              <a>{ category } </a>
          </Link>
        </NavlinksListItem>
      ))

      return categories
    }

    return <></>
  }

  return {
    renderLinks
  }
}