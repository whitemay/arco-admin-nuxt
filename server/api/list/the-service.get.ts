const theServiceList: App.ServiceRecord[] = [
  {
    id: 1,
    icon: 'code',
    title: '漏斗分析',
    description:
      '用户行为分析之漏斗分析模型是企业实现精细化运营、进行用户行为分析的重要数据分析模型。',
    enable: true,
    actionType: 'button',
  },
  {
    id: 2,
    icon: 'edit',
    title: '用户分布',
    description:
      '快速诊断用户人群，地域细分情况，了解数据分布的集中度，以及主要的数据分布的区间段是什么。',
    enable: true,
    actionType: 'button',
    expires: true,
  },
  {
    id: 3,
    icon: 'user',
    title: '资源分发',
    description:
      '移动端动态化资源分发解决方案。提供稳定大流量服务支持、灵活定制的分发圈选规则，通过离线化预加载。',
    enable: false,
    actionType: 'button',
  },
  {
    id: 4,
    icon: 'user',
    title: '用户画像分析',
    description:
      '用户画像就是将典型用户信息标签化，根据用户特征、业务场景和用户行为等信息，构建一个标签化的用户模型。',
    enable: true,
    actionType: 'button',
  },
]

export default eventHandler(() => {
  return successResponseWrap(
    theServiceList.map((_, index) => ({
      ...theServiceList[index % theServiceList.length],
      id: 'random.guid',
    })),
  )
})
