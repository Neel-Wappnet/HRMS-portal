export const timeDifferance = (previous:Date)=>{
  const current = new Date().valueOf()
  const pre = previous.valueOf()
  return current - pre
}