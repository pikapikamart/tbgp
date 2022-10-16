import { 
  AppDispatch, 
  RootState } from "@/store/index";
import { 
  selectStaff, 
  setStaff } from "@/store/slices/staff.slice";
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
  const staff = useAppSelector(selectStaff)

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

export const useStaffState = () =>{
  const staff = useAppSelector(selectStaff)

  return staff
}