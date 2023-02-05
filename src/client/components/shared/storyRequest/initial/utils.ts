

export const convertDateToString = ( date: string, isShort?: boolean ) =>{
  const newDate = new Date(date)
  const dateOptions = { year: 'numeric', month: isShort? "short" : "long", day: 'numeric' } as const

  return newDate.toLocaleDateString("en-us", dateOptions)
}