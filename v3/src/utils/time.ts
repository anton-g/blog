export const getDayAndMinute = () => {
  const date = new Date()
  const forcedUTCDate = new Date(date.toISOString().slice(0, -1))
  const copy = new Date(forcedUTCDate)
  const minute = Math.floor((forcedUTCDate.getTime() - copy.setHours(0, 0, 0, 0)) / 1000 / 60)
  const day = forcedUTCDate.getDay()

  return { day, minute }
}
