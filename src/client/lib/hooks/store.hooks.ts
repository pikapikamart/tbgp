import { WriteupPhases } from "@/src/server/models/writeup.model";
import { 
  AppDispatch, 
  RootState } from "@/store/index";
import { selectArticles } from "@/store/slices/articles.slice";
import { 
  selectStaff, 
  setStaff } from "@/store/slices/staff.slice";
import { 
  selectWriteup, 
  setWriteup } from "@/store/slices/writeup.slice";
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
  const { status } = useSession({
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
    },
    onError: () =>{
      router.replace("/storybuilder/login")
    }
  })

  if ( !staff.username && status==="authenticated" ) {
    query.refetch()
  }

  return {
    staff
  }
}

export const useSelectStaff = () =>{
  const staff = useAppSelector(selectStaff)

  return staff
}

const useWriteup = () =>{
  const writeup = useAppSelector(selectWriteup)

  return writeup
}

export const useSetupWriteup = () =>{
  const router = useRouter()
  const writeup = useWriteup()
  const dispatch = useAppDispatch()
  const query = trpc.useQuery(["writeup.get", {
    writeupId: router.query["writeup"] as string,
    phase: router.query["phase"] as WriteupPhases
  }], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) => {
      dispatch(setWriteup(data))
    }
  })

  useEffect(() =>{
    if ( !writeup.writeupId ) {
      query.refetch()
    }
  }, [ writeup.writeupId ])

  useEffect(() =>{
    query.refetch()
  }, [ router.query["phase"] ])

  return {
    writeup,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching
  }
}

export const useSelectWriteup = () => {
  const writeup = useAppSelector(selectWriteup)

  return writeup
}

export const useSelectArticles = () => {
  const articles = useAppSelector(selectArticles)

  return articles
}

export const useViewArticle = () =>{
  const articles = useAppSelector(selectArticles)

  return articles.viewing
}