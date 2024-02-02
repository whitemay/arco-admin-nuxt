import random from 'random'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const { quota = 'visitors' } = body
  if (['visitors', 'comment'].includes(quota)) {
    const year = new Date().getFullYear()
    const getLineData = (name: number) => {
      return Array.from({ length: 12 }).fill(0).map((_item, index) => ({
        x: `${index + 1}月`,
        y: random.int(0, 100),
        name: String(name),
      }))
    }
    return successResponseWrap({
      count: 5670,
      growth: 206.32,
      chartData: [...getLineData(year), ...getLineData(year - 1)],
    })
  }
  if (['published'].includes(quota)) {
    const year = new Date().getFullYear()
    const getLineData = (name: number) => {
      return Array.from({ length: 12 }).fill(0).map((_item, index) => ({
        x: `${index + 1}日`,
        y: random.int(20, 100),
        name: String(name),
      }))
    }
    return successResponseWrap({
      count: 5670,
      growth: 206.32,
      chartData: [...getLineData(year)],
    })
  }
  return successResponseWrap({
    count: 5670,
    growth: 206.32,
    chartData: [
      // itemStyle for demo
      { name: '文本类', value: 25, itemStyle: { color: '#8D4EDA' } },
      { name: '图文类', value: 35, itemStyle: { color: '#165DFF' } },
      { name: '视频类', value: 40, itemStyle: { color: '#00B2FF' } },
    ],
  })
})
