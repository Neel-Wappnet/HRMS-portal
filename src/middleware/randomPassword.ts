export const randomPassword = (): string => {
  return Math.random().toString(36).slice(-10)
}