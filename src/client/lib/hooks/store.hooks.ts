import { 
  AppDispatch, 
  RootState } from "@/store/index";
import { 
  selectStaff, 
  setStaff } from "@/store/slices/staff.slice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  TypedUseSelectorHook, 
  useDispatch } from "react-redux";
import { trpc } from "../trpc";


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSetupStaff = () =>{
  const query = trpc.useQuery(["staff.get-profile"], {
    refetchOnWindowFocus: false,
    enabled: false
  })
  const dispatch = useAppDispatch()
  const router = useRouter()
  const staff = useAppSelector(selectStaff)
  const session = useSession({
    required: true,
    onUnauthenticated(){
      router.replace("/storybuilder/login")
    }
  })

  useEffect(() =>{
    if ( query.isSuccess ) {
      dispatch(setStaff(query.data.data))
    }
  }, [ query.isSuccess ])

  useEffect(() =>{
    if ( !staff.username ) {
      query.refetch()
    }
  }, [])

  return {
    staff
  }
}