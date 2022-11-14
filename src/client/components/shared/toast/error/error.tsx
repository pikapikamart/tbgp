import { 
  ToastMessage, 
  ToastStatus, 
  ToastWrapper } from "../toast.styled"


type ErrorProps = {
  code: string,
  message: string
}

const Error = ({ code, message }: ErrorProps) =>{

  return (
    <ToastWrapper colored="red">
      <ToastStatus>{ code }</ToastStatus>
      <ToastMessage>{ message }</ToastMessage>
    </ToastWrapper>
  )
}


export default Error