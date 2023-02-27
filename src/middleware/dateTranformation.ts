import moment from "moment"

export const dateFormation = (date: string) => {
  const newDate = moment(date, "DD-MM-YYYY").toLocaleString()
  return newDate
}

export const dateDifferance = (date1: string, date2: string): number => {

  let a = moment(date1, "LLLL")
  let b = moment(date2, "LLLL")

  return (b.diff(a, "days") + 1)
}