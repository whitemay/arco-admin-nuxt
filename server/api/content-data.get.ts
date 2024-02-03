import dayjs from 'dayjs'

export default eventHandler(() => {
  const presetData = [58, 81, 53, 90, 64, 88, 49, 79]
  const getLineData = () => {
    const count = 8
    return Array.from({ length: count }).fill(0).map((el, idx) => ({
      x: dayjs()
        .day(idx - 2)
        .format('YYYY-MM-DD'),
      y: presetData[idx],
    }))
  }
  return successResponseWrap([...getLineData()])
})
