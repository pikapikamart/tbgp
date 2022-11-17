import { 
  DateDayLong, 
  DateFull, 
  DateWrapper } from "./date.styled"

const getDate = () =>{
  const date = new Date()
  const dateDay = date.toLocaleDateString("en-us", { weekday: "long" })
  const dateFull = date.toLocaleDateString("en-us", {
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