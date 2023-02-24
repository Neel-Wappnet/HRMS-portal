export const stringToDate = (dateString:string)=>{
  const [date,month,year] = dateString.split('-')
  // console.log(date,month,year)

  const dateObj  = new Date(parseInt(year),parseInt(month) -1,parseInt(date))
  
  return dateObj
  
}

// stringToDate("22-02-1992")