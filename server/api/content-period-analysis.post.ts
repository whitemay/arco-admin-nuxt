import Mock from 'mockjs'

export default eventHandler(() => {
  const getLineData = (name: string) => {
    return {
      name,
      value: Array.from({ length: 12 }).fill(0).map(() => Mock.Random.integer(30, 90)),
    }
  }
  return successResponseWrap({
    xAxis: Array.from({ length: 12 }).fill(0).map((_item, index) => `${index * 2}:00`),
    data: [
      getLineData('纯文本'),
      getLineData('图文类'),
      getLineData('视频类'),
    ],
  })
})
