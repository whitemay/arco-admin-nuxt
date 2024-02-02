export default eventHandler(() => {
  return successResponseWrap([
    {
      key: '1',
      contentNumber: '视频类001003',
      updateContent: '视频参数变更',
      status: 0,
      updateTime: '2021-02-28 10:30:50',
    },
    {
      key: '2',
      contentNumber: '视频类058212',
      updateContent: '视频参数变更；音频参数变更',
      status: 1,
      updateTime: '2020-05-13 08:00:00',
    },
  ])
})
