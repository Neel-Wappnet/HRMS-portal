const otpGenerator = ()=>{
  return Math.random().toFixed(6).split(".")[1]
}

console.log(otpGenerator())