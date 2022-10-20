import { trpc } from "@/lib/trpc"
import { 
  useEffect,
  useState } from "react"


type WritersNames = {
  bastionId: string,
  firstname: String,
  lastname: string
}

export const useFetchWriters = () =>{
  const [ writers, setWriters ] = useState<WritersNames[]>([])
  const query = trpc.useQuery(["staff.get-writers-name"], {
    onSuccess: ({ data }) =>{
      setWriters(data as WritersNames[])
    }
  })

  useEffect(() =>{
    query.refetch()
  }, [])

  return {
    options: writers.map(writer => (
      { 
        value: writer.bastionId,
        label: writer.firstname + " " + writer.lastname 
      }))
  }
}