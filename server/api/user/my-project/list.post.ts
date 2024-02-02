export default eventHandler(() => {
  const contributors = [
    {
      name: '秦臻宇',
      email: 'qingzhenyu@arco.design',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      name: '于涛',
      email: 'yuebao@arco.design',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      name: '宁波',
      email: 'ningbo@arco.design',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      name: '郑曦月',
      email: 'zhengxiyue@arco.design',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      name: '宁波',
      email: 'ningbo@arco.design',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
  ]
  const units = [
    {
      name: '企业级产品设计系统',
      description: 'Arco Design System',
    },
    {
      name: '火山引擎智能应用',
      description: 'The Volcano Engine',
    },
    {
      name: 'OCR文本识别',
      description: 'OCR text recognition',
    },
    {
      name: '内容资源管理',
      description: 'Content resource management ',
    },
    {
      name: '今日头条内容管理',
      description: 'Toutiao content management',
    },
    {
      name: '智能机器人',
      description: 'Intelligent Robot Project',
    },
  ]
  return successResponseWrap(
    Array.from({ length: 6 }).fill(null).map((_item, index) => ({
      id: index,
      name: units[index].name,
      description: units[index].description,
      peopleNumber: 10,
      contributors,
    })),
  )
})
