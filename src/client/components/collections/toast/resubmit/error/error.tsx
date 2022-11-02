import { 
  ToastMessage,
  ToastStatus, 
  ToastWrapper } from "../../toast.styled";


const Error = () =>{
 
  return (
    <ToastWrapper colored="red">
      <ToastStatus>Error</ToastStatus>
      <ToastMessage>Make sure to fill up all notes field or remove it</ToastMessage>
    </ToastWrapper>
  )
}


export default Error;