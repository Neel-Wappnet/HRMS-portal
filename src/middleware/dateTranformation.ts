import moment from "moment"

export const dateFormation = (date:string)=>{
  const newDate = moment(date,"DD-MM-YYYY").toLocaleString()
  return newDate
}
