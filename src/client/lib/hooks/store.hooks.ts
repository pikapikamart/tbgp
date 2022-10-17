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
  const staff = useAppSelector(selectStaff)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data, status } = useSession({
    required: true,
    onUnauthenticated(){
      router.replace("/storybuilder/login")
    }
  })
  const query = trpc.useQuery(["staff.get-profile"], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ( { data } ) =>{
      
      dispatch(setStaff(data))
    }
  })

  if ( !staff.username && status==="authenticated" ) {
    query.refetch()
  }

  return {
    staff
  }
}