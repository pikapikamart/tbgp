import { InitArticleDate } from "@/styled/shared/article/initial"


type DateProps = {
  date: string
}

const processDate = ( date: string ) => {
  const newDate = new Date(date)
  const processedDate = newDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })

  return processedDate
}

const DateComp = ({ date }: DateProps) => {

  return (
    <InitArticleDate>
      <img
        src="/icons/icon-date.svg" 
        alt="" />
      <p>{ processDate(date) }</p>
    </InitArticleDate>
  )
}


export default DateComp