import Mock from 'mockjs'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const { quota } = body
  const getLineData = () => {
    return {
      xAxis: Array.from({ length: 12 }).fill(0).map((_item, index) => `${index + 1}日`),
      data: {
        name: quota,
        value: Array.from({ length: 12 })
          .fill(0)
          .map(() => Mock.Random.integer(1000, 3000)),
      },
    }
  }
  return successResponseWrap({
    count: Mock.Random.integer(1000, 3000),
    growth: Mock.Random.integer(2000, 10000) / 100,
    chartData: getLineData(),
  })
})
