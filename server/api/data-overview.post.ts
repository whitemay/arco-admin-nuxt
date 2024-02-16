import Mock from 'mockjs'

export default eventHandler(() => {
  const generateLineData = (name: string) => {
    return {
      name,
      count: Mock.Random.integer(20, 2000),
      value: Array.from({ length: 8 }).fill(0).map(() => Mock.Random.integer(800, 4000)),
    }
  }
  const xAxis = Array.from({ length: 8 }).fill(0).map((_item, index) => {
    return `12.1${index}`
  })
  return successResponseWrap({
    xAxis,
    data: [
      generateLineData('内容生产量'),
      generateLineData('内容点击量'),
      generateLineData('内容曝光量'),
      generateLineData('活跃用户数'),
    ],
  })
})
