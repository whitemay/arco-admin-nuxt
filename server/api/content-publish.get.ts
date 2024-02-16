import Mock from 'mockjs'

export default eventHandler(() => {
  const generateLineData = (name: string) => {
    const result = {
      name,
      x: [] as string[],
      y: [] as number[],
    }
    Array.from({ length: 12 }).fill(0).forEach((_item, index) => {
      result.x.push(`${index * 2}:00`)
      result.y.push(Mock.Random.integer(1000, 3000))
    })
    return result
  }
  return successResponseWrap([
    generateLineData('纯文本'),
    generateLineData('图文类'),
    generateLineData('视频类'),
  ])
})
