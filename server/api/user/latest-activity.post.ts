export default eventHandler(() => {
  return successResponseWrap(
    Array.from({ length: 7 }).fill(null).map((_item, index) => ({
      id: index,
      title: '发布了项目 Arco Design System',
      description: '企业级产品设计系统',
      avatar:
        '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
    })),
  )
})
