export const otpGenerator = (): number => {
  return parseInt(Math.random().toFixed(6).split(".")[1])
}