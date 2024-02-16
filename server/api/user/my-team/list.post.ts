import Mock from 'mockjs'

export default eventHandler(() => {
  return successResponseWrap([
    {
      id: 1,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      name: '火山引擎智能应用团队',
      peopleNumber: Mock.Random.integer(10, 100),
    },
    {
      id: 2,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
      name: '企业级产品设计团队',
      peopleNumber: Mock.Random.integer(5000, 6000),
    },
    {
      id: 3,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
      name: '前端/UE小分队',
      peopleNumber: Mock.Random.integer(10, 5000),
    },
    {
      id: 4,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
      name: '内容识别插件小分队',
      peopleNumber: Mock.Random.integer(10, 100),
    },
  ])
})
