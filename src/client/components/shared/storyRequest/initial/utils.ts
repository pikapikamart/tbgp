

export const convertDateToString = ( date: string ) =>{
  const newDate = new Date(date)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const

  return newDate.toLocaleDateString(undefined, dateOptions)
}