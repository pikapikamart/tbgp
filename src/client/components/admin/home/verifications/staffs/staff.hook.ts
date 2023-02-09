import { trpc } from "@/lib/trpc"
import { Role } from "@/src/server/models/staff.model"
import { StaffsPaginateSchema } from "@/src/server/schemas/admin.schema"
import { InitialStaffState } from "@/store/slices/staff.slice"
import { 
  useEffect, 
  useState } from "react"
import { useInView } from "react-intersection-observer"


type QueryInput = StaffsPaginateSchema

export const useEditStaffPosition = () =>{
  const [ staffs, setStaffs ] = useState<InitialStaffState[]>([])
  const [ queryInput, setQueryInput ] = useState<QueryInput>({})
  const staffsQuery = trpc.useQuery(["admin.get-staffs-profile", queryInput], {
    refetchOnWindowFocus: false,
    onSuccess: ( {data} ) => {
      setStaffs(prev => prev.concat(data))
    }
  })
  const {
    ref,
    inView } = useInView({ threshold: 1 })

  const handleUpdateStaffPosition = ( index: number, position: { name: string, role: Role } ) =>{
    setStaffs(prev => {
      const newState = [ ...prev ]
      newState[index].position = position

      return newState
    })
  }

  useEffect(() =>{
    const length = staffs.length

    if ( inView && length && queryInput?.paginate?.lastId!==staffs[length-1]._id ) {
      setQueryInput(prev => ({
        ...prev,
        paginate: {
          lastId: staffs[length-1]._id,
          number: 8
        }
      }))
    }
  }, [ inView, staffs ] )

  return {
    staffs,
    ref,
    handleUpdateStaffPosition
  }
}