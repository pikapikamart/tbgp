import { useRouter } from "next/router"
import { useEffect } from "react"


export const useSuccess = () =>{
  const router = useRouter()

  useEffect(() =>{
    const timeout = setTimeout(() =>{
      router.replace('/storybuilder/activities?tab=writeup')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])
}