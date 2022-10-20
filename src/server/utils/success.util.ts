

export const apiResult = ( message: string, success: boolean | string ) => (
  {
    message,
    success
  }
)

export const trpcSuccess = <T>( success: boolean, data: T ) => {

  return {
    success,
    data
  }
}