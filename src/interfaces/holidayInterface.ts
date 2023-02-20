export interface Holiday{
  id:number,
  title:string,
  startDate:Date,
  endDate:Date,
  isOptional:boolean,
  status:["enabled","disabled"]
}