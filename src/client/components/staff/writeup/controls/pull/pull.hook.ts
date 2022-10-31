import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup} from "@/lib/hooks/store.hooks"
import { setShouldSave } from "@/store/slices/writeup.slice"


export const useSaveWriteup = () =>{
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  const dispatch = useAppDispatch()

  const handleWriteupSave = () => {
    dispatch(setShouldSave())
  }

  return {
    staff,
    writeup,
    handleWriteupSave,
  }
}