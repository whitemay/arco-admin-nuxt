export default eventHandler(() => {
  const generateData = () => {
    const list = Array.from({ length: 7 }).fill(0).map((_item, index) => ({
      ranking: index + 1,
      author: 'author',
      contentCount: 30,
      clickCount: 94,
    }))
    return {
      list,
    }
  }
  return successResponseWrap({
    ...generateData(),
  })
})
