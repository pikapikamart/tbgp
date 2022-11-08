import { 
  DateDayLong, 
  DateFull, 
  DateWrapper } from "./date.styled"

const getDate = () =>{
  const date = new Date()
  const dateDay = date.toLocaleDateString(undefined, { weekday: "long" })
  const dateFull = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  })

  return {
    dateDay,
    dateFull
  }
}

const HeaderDate = () =>{

  return (
    <DateWrapper>
      <DateDayLong>{ getDate().dateDay }</DateDayLong>
      <DateFull>{ getDate().dateFull }</DateFull>
    </DateWrapper>
  )
}


export default HeaderDate