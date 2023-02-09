import { trpc } from "@/lib/trpc"


export const useEditStaffPosition = () =>{
  const staffs = trpc.useQuery(["admin.get-staffs-profile"], {
    refetchOnWindowFocus: false,
  })

  const handleRefetchStaffs = () => {
    staffs.refetch()
  }

  return {
    staffs: staffs.data?.data?? [],
    handleRefetchStaffs
  }
}